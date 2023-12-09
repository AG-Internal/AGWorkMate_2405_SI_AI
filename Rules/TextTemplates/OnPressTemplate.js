/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import ClosePage from "./ClosePage";
import { TextTemp } from "./TextTemp";
import OpenTextSeq from "./OpenTextSeq";
import ChatGPTInitChat from "./ChatGPTInitChat";
import LT_OpenSummaryPage from "./LT_OpenSummaryPage";
export default function OnPressTemplate(clientAPI) {
    var sTempTypeAI = clientAPI.getGlobalDefinition('/SmartInspections/Globals/TextTemplates/TYPE_AI.global').getValue();//AI option
    var sTempTypeLT = clientAPI.getGlobalDefinition('/SmartInspections/Globals/TextTemplates/TYPE_LONGTEXT.global').getValue();//Long Text
    //get the Selected Config
    var oActionBinding = clientAPI.getPageProxy().getActionBinding();
    //Set it to Static Variable
    TextTemp.setTemplateConfigBinding(oActionBinding);
    // Reset the Client Data and Start the Sequence
    return TextTemp.getTemplateDetails(clientAPI).then(function (result) {

        if (TextTemp._obTemplateConfig.TempRowType === sTempTypeAI) {
            //AI Template
            TextTemp.aiResetChatData();
            ChatGPTInitChat(clientAPI);
        }
        else if (TextTemp._obTemplateConfig.TempRowType === sTempTypeLT) {
            //Long Text Template
            TextTemp.LTResetLongTextData();
            LT_OpenSummaryPage(clientAPI);
        }
        else {
            //Text Sequence Template
            TextTemp.resetTextSeqCurrenRow();
            OpenTextSeq(clientAPI);
        }

    });
}
