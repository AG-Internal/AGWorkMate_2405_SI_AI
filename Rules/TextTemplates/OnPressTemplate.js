/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import ClosePage from "./ClosePage";
import { TextTemp } from "./TextTemp";
import OpenTextSeq from "./OpenTextSeq";
export default function OnPressTemplate(clientAPI) {
    //get the Selected Config
    var oActionBinding = clientAPI.getPageProxy().getActionBinding();
    //Set it to Static Variable
    TextTemp.setTemplateConfigBinding(oActionBinding);
   // Reset the Client Data and Start the Sequence
    return TextTemp.getTemplateDetails(clientAPI).then(function (result) {
        TextTemp.resetTextSeqCurrenRow();
        OpenTextSeq(clientAPI);
    });
}
