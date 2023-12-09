/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { GetDataUtil } from "../SIData/GetDataUtil";
import { TextTemp } from "./TextTemp";
export default function ChatGPTInitChat(clientAPI, pbIsInitalCall) {
    var sIdActInd = clientAPI.showActivityIndicator("AI gears are turning...");
    /* Initial call - read Techobject Data and Call ChatGPT */
    //return ture if tech object is not Permanently saved
    var listPageClientData = undefined;
    var binding = undefined;
    //read the list page Data
    try {
        listPageClientData = clientAPI.evaluateTargetPath("#Page:TechnicalObjectDetailsList/#ClientData");
        binding = listPageClientData.NavigatedTechObject;
    } catch (err) { }

    var oDetails = {
        OrderNumber: binding.OrderNumber,
        TechnicalObject: binding.TechnicalObject
    };

    //Get the Failed MICs
    return GetDataUtil.getTechObjFailedInspForAI(clientAPI, oDetails).then(function (result) {

        //Close the Indicator
        clientAPI.dismissActivityIndicator(sIdActInd);
        if (result.bHasFails) {
            //Set Data
            TextTemp.aiPrepareInitialChatData(oDetails.TechnicalObject, result.sFaultText);
            TextTemp.aiPrepareFirstPrompt();
            //Call API Post
            clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/ChatGPTInit.action");
        } else {
            //No Failures
            clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/ChatGPT_InitNeedFailedMic.action");
        }
    });

}
