/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { TextTemp } from "./TextTemp";
export default function ChatGPT_CancelAndShowSummary(clientAPI) {
    /* Cancele the Process and Show summary */

    //Summarize it
    TextTemp.aiSummarizeChatGPT();
    //close the Modal and Open the Summary Page Again
    return clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/ClosePage.action").then(function (param) {
        //Open the Summary
        clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/OpenTextSeqSummary.action");
    });


}
