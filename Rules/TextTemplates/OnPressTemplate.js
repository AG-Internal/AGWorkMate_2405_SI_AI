/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import ClosePage from "./ClosePage";
import { TextTemp } from "./TextTemp";
import OpenTextSeq from "./OpenTextSeq";
import ChatGPTInitChat from "./ChatGPTInitChat";
export default function OnPressTemplate(clientAPI) {
    var sTempTypeAI = clientAPI.getGlobalDefinition('/SmartInspections/Globals/TextTemplates/TYPE_AI.global').getValue();//AI options
    //get the Selected Config
    var oActionBinding = clientAPI.getPageProxy().getActionBinding();
    //Set it to Static Variable
    TextTemp.setTemplateConfigBinding(oActionBinding);
    // Reset the Client Data and Start the Sequence
    return TextTemp.getTemplateDetails(clientAPI).then(function (result) {

        if (TextTemp._obTemplateConfig.TempRowType === sTempTypeAI) {
            //Chat
            TextTemp.aiResetChatData();
            ChatGPTInitChat(clientAPI);
        } else {
            //Text Seq
            TextTemp.resetTextSeqCurrenRow();
            OpenTextSeq(clientAPI);
        }

    });
}
