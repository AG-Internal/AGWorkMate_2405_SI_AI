/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { TextTemp } from "./TextTemp";
import ChatGPTTextAPICall from "./ChatGPTTextAPICall";
export default function ChatGPTInputPage_OnPressNext(clientAPI) {
    //get the response value
    let simpleProp = clientAPI.evaluateTargetPathForAPI('#Page:-Current/#Control:ResponseControl');
    let sValue = simpleProp.getValue();

    if (!sValue) {
        //Provide Response
        clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/ConfigProvideResponse.action");
    } else {
        TextTemp.aiAppendUserRespToChatData(sValue);
        //close the Modal and Open the Page Again
        return clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/ClosePage.action").then(function (param) {
            ChatGPTTextAPICall(clientAPI);
        });

    }
}
