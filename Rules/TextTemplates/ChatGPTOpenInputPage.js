/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { TextTemp } from "./TextTemp";
export default function ChatGPTOpenInputPage(clientAPI) {
    alert("Inside Open");
    /* open Input Page for ChatGPT */
    TextTemp.aiPrepareCurrentRow();

    if (TextTemp._aiPageData.isSummary) {
        //Open Summary page
        TextTemp.aiSummarizeChatGPT();
        clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/OpenTextSeqSummary.action");
    } else {
        //Open Text Sequence
        clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/ChatGPT_OpenInputPage.action");
    }
}
