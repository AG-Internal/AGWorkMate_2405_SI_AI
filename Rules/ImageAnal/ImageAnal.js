import { GetDataUtil } from "../SIData/GetDataUtil";
export class ImageAnal {

    /**********************************************************
       * Init
    **********************************************************/
    static initGlobals() {
        this._obTechObject = undefined;// Technical Object Binding
        this._oTechObjectInsp = undefined;
        this._oResultData = undefined;

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

} //ImageAnal


