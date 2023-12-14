/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { ImageAnal } from "./ImageAnal";

function Wait() {
    //Resolves after 1 s
    return new Promise(r => setTimeout(r, 1));
    //return Promise.resolve();
}

function ExecuteAIResultUpdateEntity(clientAPI, binding) {
    /* Call Method to update it */
    clientAPI.getPageProxy().setActionBinding(binding);
    return clientAPI.executeAction('/SmartInspections/Actions/ImageAnal/InspectionAIResult_UpdateEntity.action');
}

export default function TOIPS_OnSaveSummary(clientAPI) {
    /* Save the Summary */
    var nActivityInd = clientAPI.showActivityIndicator("Updating Inspections List. Please wait...");
    //get MICs Binding From Global
    var aMicItems = ImageAnal._oTechObjectInsp.aAllMics;
    //Get the AI Results
    var aAIResults = ImageAnal._oProcessedResp.aResponse;

    /**********************************************************
        Get the Table and check if it has selection
     **********************************************************/
    var iSelLength = ImageAnal._aSummarySelectedIndices.length;
    if (iSelLength > 0) {
        var iFindIndex = -1;
        for (var i = 0; i < aAIResults.length; i++) {
            iFindIndex = aAIResults[i].Index;
            if (ImageAnal._aSummarySelectedIndices.indexOf(iFindIndex) >= 0) {
                aAIResults[i].Selected = true;
            } else {
                aAIResults[i].Selected = false;
            }
        }
    }

    /**********************************************************
          Prepare and Save
    **********************************************************/
    var latestPromise = Promise.resolve();
    for (var i = 0; i < aMicItems.length; i++) {
        let oMicBinding = aMicItems[i];//Mic Binding
        let oAIResult = aAIResults[i];//Must be in same index as we sent

        if (!oAIResult.IsFitForUpdate) {
            continue;//Check if it is fit for update
        }
        if (!oAIResult.Selected) {
            continue;//Check if it selected to update
        }
        //Proceed to update the line

        //Results
        oMicBinding.FixedValuesResult = oAIResult.FixedValuesResult; //Fixed value Result
        oMicBinding.Result = oAIResult.Result; //Result
        //Defectcodes
        oMicBinding.DefectCodeGroup = oAIResult.DefectCodeGroup; //DefectCodeGroup
        oMicBinding.DefectCode = oAIResult.DefectCode; //DefectCode

        //Mic Descope
        oMicBinding.MicDescopeType = oAIResult.MicDescopeType; //Descope Type
        oMicBinding.MicDescopeDesc = oAIResult.MicDescopeDesc; //Descope Desc
        if (oMicBinding.MicDescopeType !== "") {
            oMicBinding.IsDescopeUpdated = true;
        }
        //Long Text
        oMicBinding.LongText = oAIResult.LongText;
        latestPromise = latestPromise.then(() => {
            return ExecuteAIResultUpdateEntity(clientAPI, oMicBinding);
        }).then(Wait);

    }//for

    return latestPromise.then(function () {
        clientAPI.dismissActivityIndicator(nActivityInd);
        return clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/ClosePage.action").then(function (param) {
            return clientAPI.executeAction("/SmartInspections/Actions/TOIP_SaveCompleted.action")
        });
    });
}
