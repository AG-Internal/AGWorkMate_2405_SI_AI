import { GetDataUtil } from "../SIData/GetDataUtil";
export class ImageAnal {

    /**********************************************************
       * Init
    **********************************************************/
    static initGlobals() {
        this._obTechObject = undefined;// Technical Object Binding
        this._oTechObjectInsp = undefined;//Techncal Object Details
        this._oResultData = undefined; //Results Data
        this._sPromptSystem = "";//Prompt for System role
        //Chat Data
        this._aAttachData = [];// attachment Data
        this._sInspCriteria = "";//Inspection Criteria concatenated
        this._oAIChatData = {};

    }
    /**********************************************************
           * SETTER and GETTER
        **********************************************************/
    static setTechObjectInsp(oValue) {
        this._oTechObjectInsp = oValue;
    }
    static setResultData(oValue) {
        this._oResultData = oValue;
    }
    static setTechObjectBinding(oValue) {
        this._obTechObject = oValue;
    }
    static setPromptSystem(sValue) {
        this._sPromptSystem = sValue;
    }
    static setAttachData(aArray) {
        this._aAttachData = aArray;
    }
    static setInspCriteria(sValue) {
        this._sInspCriteria = sValue;
    }
    static setAIChatData(oValue) {
        this._oAIChatData = oValue;
    }
    /**********************************************************
    *Get Inspection Data
    **********************************************************/

    static getInspectionData(clientAPI) {
        /* get Inspection and Result Data Set */
        //get the binding
        var oTechObjectBinding = this._obTechObject;
        //Call the First Promise
        return GetDataUtil.getTechObjInspForAI(clientAPI, oTechObjectBinding).then(function (oTOInspResp) {
            /* get the Response and call Result Data Set */
            //Set it in Global
            ImageAnal.setTechObjectInsp(oTOInspResp);
            //Call Next Promise
            return GetDataUtil.getResultDataSetOnQuery(clientAPI, oTOInspResp.sResultDataSetQuery).then(function (oResultResp) {
                //Set it in Global
                ImageAnal.setResultData(oResultResp);
                //End of chain
                return true;
            });
        });

    }//getInspectionData
    /**********************************************************
   *Get Template Data
   **********************************************************/
    static getPromptFromTemplateData(clientAPI) {
        /* Get the template Based Detail for Prompt */
        var sTemplateArea = clientAPI.getGlobalDefinition('/SmartInspections/Globals/TextTemplates/AREA_SI_TOINSP.global').getValue();
        //Read the entity
        return GetDataUtil.getTemplateDetailForArea(clientAPI, sTemplateArea).then(function (aTemplateTexts) {
            var bHasData = false;
            var oTemplateDetail = undefined;
            if (aTemplateTexts && aTemplateTexts.length > 0) {
                //Read the First entry as only one entry ll b there for this
                oTemplateDetail = aTemplateTexts[0];
            }
            //Set to Global
            if (oTemplateDetail) {
                bHasData = true;
                ImageAnal.setPromptSystem(oTemplateDetail.TempLongText);
            }
            return bHasData;
        });
    }

    /**********************************************************
   *For API call
   **********************************************************/
    static prepareInspCriterias() {
        //get MICs From Global
        var aItems = this._oTechObjectInsp.aAllMics;
        //concat all the Mics in to a String
        var sInspections = "Inspection Criteria: \n";
        for (var i = 0; i < aItems.length; i++) {
            sInspections = sInspections + `${aItems[i].MicShortText} \n`;
        }
        //Set it in Global
        ImageAnal.setInspCriteria(sInspections);
    }//prepareInspCriterias

    static prepareChatData() {
        /* Prepare ChatData */
        var aMessages = [
            //System Prompt
            {
                "role": "system",
                "content": ImageAnal._sPromptSystem
            },
            //Inspections
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": ImageAnal._sInspCriteria
                    }
                ]
            }
        ];
        //Append ChatData to Messages
        for (var i = 0; i < ImageAnal._aAttachData.length; i++) {
            aMessages[1].content.push({
                "type": "image_url",
                "image_url": {
                    "url": ImageAnal._aAttachData[i].image_url
                }
            });
        }//for-ImageAnal._aAttachData

        //Final ChatData
        var oChatData = {
            "model": "gpt-4-vision-preview",
            "messages": aMessages,
            "max_tokens": 1000,
            "temperature": 1,
            "top_p": 1,
            "n": 1
        };
        //Set it to global
        ImageAnal.setAIChatData(oChatData);
    }

} //ImageAnal


