/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import ClosePage from "./ClosePage";
import { TextTemp } from "./TextTemp";
export default function OnPressTemplate(clientAPI) {
    //get the Selected Config
    var oActionBinding = clientAPI.getPageProxy().getActionBinding();
    //Set it to Static Variable
    TextTemp.setTemplateConfigBinding(oActionBinding);
    ClosePage(clientAPI);
    return TextTemp.getTemplateDetails(clientAPI).then(function (result) {
        var oDetail = TextTemp.getTemplateDetail();
        return true;
    });
}
