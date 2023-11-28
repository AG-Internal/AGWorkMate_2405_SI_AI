/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import ClosePage from "./ClosePage";
import { TextTemp } from "./TextTemp";
export default function OnPressTemplate(clientAPI) {
    var binding = clientAPI.getPageProxy().getActionBinding();

    alert(TextTemp.getTemplateArea());
    alert(binding.TemplateID);
    ClosePage(clientAPI);
}
