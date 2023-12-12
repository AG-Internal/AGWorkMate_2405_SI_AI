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

} //ImageAnal


