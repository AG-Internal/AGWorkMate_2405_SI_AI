/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ConfigPage_RowIcon(clientAPI) {

    var sIcon = "/SmartInspections/Images/gentext.dark.png";
    //Get Constants
    var oBinding = clientAPI.binding;
    var sTempTypeAI = clientAPI.getGlobalDefinition('/SmartInspections/Globals/TextTemplates/TYPE_AI.global').getValue();//AI option
    var sTempTypeLT = clientAPI.getGlobalDefinition('/SmartInspections/Globals/TextTemplates/TYPE_LONGTEXT.global').getValue();//Long Text
    var sTempTypeHD = clientAPI.getGlobalDefinition('/SmartInspections/Globals/TextTemplates/TYPE_HEADER.global').getValue();//Sequence
    //Determine Icon
    switch (oBinding.TempRowType) {
        case sTempTypeAI:
         
            sIcon = "/SmartInspections/Images/chatgpt.dark.png";
            break;
        case sTempTypeLT:
          
            sIcon = "/SmartInspections/Images/longtext.dark.png";
            break;
        case sTempTypeHD:
            sIcon = "/SmartInspections/Images/numlist.dark.png";
            break;
        default:
            sIcon = "/SmartInspections/Images/gentext.dark.png";
    }
    return sIcon;
}
