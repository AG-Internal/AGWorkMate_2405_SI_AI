import libVal from '../../../SAPAssetManager/Rules/Common/Library/ValidationLibrary';
export class TextTemp {

    /**********************************************************
    * Get TEMPLATE DETAIL
    **********************************************************/
    static getTemplateDetails(context) {
        /* Get the Template Details & Set it to App Client Data */
        var sTemplateID = this._obTemplateConfig.TemplateID;
        var sTempTypeItem = context.getGlobalDefinition('/SmartInspections/Globals/TextTemplates/TYPE_ITEM.global').getValue();
        var sQueryOptions = `$filter=TemplateID eq '${sTemplateID}'&$orderby=TempCounter`;
        //READ the entity
        var oPromise = context.read('/SmartInspections/Services/SAM.service', 'LTTemplateTextSet', [], sQueryOptions).then(
            function (results) {
                //return the Results
                var aItems = [];
                //Prepare the Array
                results.forEach(function (oValue) {
                    aItems.push(oValue);
                });
                //Prepare for Client Data
                let aTextItems = [];
                let oTextHeader = undefined;
                let oTextLine = {};
                for (var i = 0; i < aItems.length; i++) {
                    //From Entity
                    oTextLine = {};
                    oTextLine.TemplateID = aItems[i].TemplateID;
                    oTextLine.TempCounter = aItems[i].TempCounter;
                    oTextLine.TempRowType = aItems[i].TempRowType;
                    oTextLine.TempShortText = aItems[i].TempShortText;
                    oTextLine.TempLongText = aItems[i].TempLongText;
                    oTextLine.IsActive = aItems[i].IsActive;
                    //Other UI Needed Fields
                    oTextLine.ResponseText = "";
                    oTextLine.IsCompleted = false;

                    if (oTextLine.TempRowType === sTempTypeItem) {
                        //Pass the Rows to Item
                        aTextItems.push(oTextLine);
                    } else {
                        //Pass the Row to Header
                        oTextHeader = Object.assign({}, oTextLine);//Shallow Copy
                    }
                }//For
                TextTemp.setTemplateDetail(oTextHeader, aTextItems);
                // var sTempMsg = oTextHeader.TempCounter + "/" + oTextHeader.TempRowType + " - " + aTextItems.length;
                // alert(sTempMsg);
                return true;

            }); //read

        return oPromise;

    }
    /**********************************************************
       *  Class Vars
       **********************************************************/
    static init(pbDoReset/* Do Reset*/) {
        if (!pbDoReset) {
            if (this._isInit) {
                return;//Return if already Intialized
            }
        }
        this._isInit = true;
        this._sTemplateArea = undefined; //Selected Template Area
        this._obTemplateConfig = undefined;//Selected Template ID
        this._oTemplateDetail = { Header: undefined, Items: [], ItemsCount: 0 };//Template Details
        this.PageTextSeq = { Item: undefined, CurrIndex: -1, IsLastItem: false };//To SHow it in page
        this._sSummarizedText = "";
        this._saveCallFrom = "";
        //CHATGPT
        this._aiChatData = { "model": undefined, "messages": [] };//To Hold Data
        this._aiPageData = { Item: { Content: undefined }, isSummary: false };//To show it in Page
        this._aiPromptData = {
            "GPTModel": "gpt-3.5-turbo", "FirstPrompt": undefined,
            "TechObject": undefined, "FaultText": undefined
        };//Initial Prompt
    }
    static reset() {
        this.init(true);
    }
    /**********************************************************
      * GETTER and SETTER Methods
    **********************************************************/
    static getTemplateArea() {
        return this._sTemplateArea;
    }
    static setTemplateArea(psTemplateArea) {
        this.init();
        this._sTemplateArea = psTemplateArea;
    }
    static getTemplateConfigBinding() {
        return this._obTemplateConfig;
    }
    static setTemplateConfigBinding(poBinding) {
        this._obTemplateConfig = poBinding;
    }
    static getTemplateDetail() {
        return this._oTemplateDetail;
    }
    static setTemplateDetail(poHeader, paItems) {
        this.init();
        this._oTemplateDetail = { Header: poHeader, Items: paItems, ItemsCount: paItems.length };
    }
    static setSummarizedText(sValue, pSaveCallFrom, bAppend/* Append or Overwrite */) {
        if (bAppend)
            this._sSummarizedText = this._sSummarizedText + sValue;
        else
            this._sSummarizedText = sValue;
        //Save Call from
        this._saveCallFrom = pSaveCallFrom;
    }
    static getSummarizedText() {
        return this._sSummarizedText;
    }
    /**********************************************************
    * TEMPLATE SEQUENCE PROCESSING
    **********************************************************/
    static setAppClntDataTextSeq(clientAPI) {
        this.prepareTextSeqCurrenRow();
        let appClientData = clientAPI.getAppClientData();
        appClientData.PageTextSeq = this.PageTextSeq;
    }

    static prepareTextSeqCurrenRow() {
        var iMaxIndex = this._oTemplateDetail.ItemsCount - 1;
        if (this.PageTextSeq.CurrIndex === iMaxIndex)
            return;

        this.PageTextSeq.CurrIndex += 1;
        this.PageTextSeq.IsLastItem = false;
        this.PageTextSeq.Item = this._oTemplateDetail.Items[this.PageTextSeq.CurrIndex];

        if (this.PageTextSeq.CurrIndex === iMaxIndex)
            this.PageTextSeq.IsLastItem = true;

    }

    static updateTextSeqCurrenRow(psValue) {
        this.PageTextSeq.Item.ResponseText = psValue;
        this.PageTextSeq.Item.IsCompleted = true;
    }

    static resetTextSeqCurrenRow() {
        this.PageTextSeq = { Item: undefined, CurrIndex: -1, IsLastItem: false };
    }

    /**********************************************************
   * TEMPLATE SEQUENCE SUMMARIZE
   **********************************************************/
    static summarizeTextSeq() {
        var aItems = this._oTemplateDetail.Items;
        var sSummarizedText = "";
        var sCurrentLine = "";
        var sNewLine = "\n";
        for (var i = 0; i < aItems.length; i++) {
            if (!aItems[i].IsCompleted)
                continue;
            sCurrentLine = "";
            sCurrentLine = aItems[i].TempShortText + sNewLine + aItems[i].TempLongText + sNewLine + aItems[i].ResponseText + sNewLine;
            //Append to long text
            sSummarizedText = sSummarizedText + sCurrentLine;
        }
        this.setSummarizedText(sSummarizedText);
    }

    /**********************************************************
  * CHATGPT - Texts
  **********************************************************/
    static aiResetChatData() {
        /** Reset the ChatData */
        this._aiChatData = { "model": undefined, "messages": [] };
        this._aiPageData = { Item: { Content: undefined }, isSummary: false };
        this._aiPromptData = {
            "GPTModel": "gpt-3.5-turbo", "FirstPrompt": undefined,
            "TechObject": undefined, "FaultText": undefined
        };
    }

    static aiPrepareInitialChatData(psTechObject, psFaultText) {
        /** Prepare Initial Data and Data from template */
        this._aiPromptData.GPTModel = "gpt-3.5-turbo";//Model
        this._aiPromptData.FirstPrompt = this._oTemplateDetail.Header.TempLongText;//First Prompt
        this._aiPromptData.TechObject = psTechObject;//Technical Object
        this._aiPromptData.FaultText = psFaultText;//Fault Text

        /** Replace & Update the First Prompt  */
        var sFirstPrompt = this._aiPromptData.FirstPrompt;
        sFirstPrompt = sFirstPrompt.replace("_FAULTTEXT_", this._aiPromptData.FaultText);
        sFirstPrompt = sFirstPrompt.replace("_TECHOBJ_", this._aiPromptData.TechObject);

        this._aiPromptData.FirstPrompt = sFirstPrompt;
        //Message Format
        var oMessage =
        {
            "role": "user",
            "content": sFirstPrompt
        };
        //Update Model Data
        // this._aiChatData.model = "gpt-3.5-turbo";
        //this._aiChatData.messages.push(oMessage);
    }

    static aiPrepareFirstPrompt() {
        //Message Format
        var oMessage =
        {
            "role": "user",
            "content": this._aiPromptData.FirstPrompt
        };
        this._aiChatData.model = this._aiPromptData.GPTModel;
        this.aiAppendChatData(oMessage);
        alert("FirstPrompt" + this._aiPromptData.FirstPrompt);
    }

    static aiAppendUserRespToChatData(psMessage) {
        var oMessage =
        {
            "role": "user",
            "content": psMessage
        };
        this.aiAppendChatData(oMessage);
    }

    static aiAppendChatData(poMessage) {
        /* Append to Chat Data */
        if (poMessage)
            this._aiChatData.messages.push(poMessage);
    }
    static aiPrepareCurrentRow() {
        /* Prepare Current row needs to be shown in Page */
        var iMsglen = this._aiChatData.messages.length;
        var iSelIndex = iMsglen - 1;
        //Read the Last Row and show it
        var sContent = this._aiChatData.messages[iSelIndex].content;

        this._aiPageData.Item.Content = sContent;
        //Check if has Summary chat
        if (this._aiPageData.Item.Content.search("<END OF SUMMARY>") >= 0)
            this._aiPageData.isSummary = true;

    }

    static aiSummarizeChatGPT() {
        var aItems = this._aiChatData.messages;
        var sSummarizedText = "";
        var sCurrentLine = "";
        var sNewLine = "\n";
        for (var i = 0; i < aItems.length; i++) {
            if (i === 0)
                continue //Skip First Chat
            sCurrentLine = "";
            sCurrentLine = aItems[i].role + sNewLine + aItems[i].content + sNewLine;
            //Append to long text
            sSummarizedText = sSummarizedText + sCurrentLine;
        }
        this.setSummarizedText(sSummarizedText);
    }

    /**********************************************************
        * Others
        **********************************************************/

    /* Check Connections */
    static hasConnection(context) {
        //check if we have any netwrok connection
        var bHasConnection = false;
        if (context.getPageProxy().nativescript.connectivityModule.getConnectionType()) {
            bHasConnection = true;
        }
        return bHasConnection;
    }
    /* Get Templates */
    static readConfigs(context, psTemplateArea) {
        /* Get the Smart Inspection Template Conf */
        //Query
        var sQueryOptions = `$filter=TemplateArea eq '${psTemplateArea}'`;
        //Read Parameters
        var oPromise = context.read('/SmartInspections/Services/SAM.service', 'LTTemplateConfigSet', [], sQueryOptions).then(
            function (results) {
                //return the Results
                var aConfigs = [];
                //Prepare the Array
                results.forEach(function (oValue) {
                    aConfigs.push(oValue);
                });
                return aConfigs;
            });

        return oPromise;
    } //readConfigs()


    static buildConfigsforArea(context, psTemplateArea) {

        var oPromiseConfigs = this.readConfigs(context, psTemplateArea);
        var bHasConnection = this.hasConnection(context);
        var sTempTypeAI = context.getGlobalDefinition('/SmartInspections/Globals/TextTemplates/TYPE_AI.global').getValue();
        var that = this;
        return Promise.all([oPromiseConfigs]).then(function (params) {
            let aConfigs = params[0];
            let aItems = [];
            let bEnabled = true;
            for (var i = 0; i < aConfigs.length; i++) {

                bEnabled = true;
                if (aConfigs[i].TempRowType === sTempTypeAI) { //If RESTService only available when connection is there
                    bEnabled = bHasConnection;
                }
                if (!bEnabled) {
                    continue;
                }
                aItems.push({
                    "TemplateArea": aConfigs[i].TemplateArea,
                    "TemplateID": aConfigs[i].TemplateID,
                    "TempRowType": aConfigs[i].TempRowType,
                    "TempRowTypeText": aConfigs[i].TempRowTypeText,
                    "TempShortText": aConfigs[i].TempShortText,
                    "ConfigShortText": aConfigs[i].ConfigShortText,
                    "Enabled": bEnabled
                });

            }//For


            return true;

        });

    }//buildConfigsforArea


}//Class