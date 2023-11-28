/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { TextTemp } from "./TextTemp";
import CheckForConnectivity from '../../../SAPAssetManager/Rules/Common/CheckForConnectivity';
export default function QueryConfigSet(clientAPI) {
    /* Query To List Template Options */
    var sTempTypeAI = clientAPI.getGlobalDefinition('/SmartInspections/Globals/TextTemplates/TYPE_AI.global').getValue();//AI options
    //Not Network Conditions
    var sNoNetwork = ` and TempRowType ne '${sTempTypeAI}'`;
    //General Filters
    var sTemplateArea = TextTemp.getTemplateArea();
    var sQueryString = `$filter=TemplateArea eq '${sTemplateArea}'`;

    if (!CheckForConnectivity(clientAPI)) {
        //If No Connectivity - DOnt show the AI Templates
        sQueryString = sQueryString + sNoNetwork;
    }

    return sQueryString;
}
