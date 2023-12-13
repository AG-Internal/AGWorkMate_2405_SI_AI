/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function TOIPS_LineStatusIcon(clientAPI) {

    var binding = clientAPI.binding;
    var sAIResultUC = binding.AIResult.toUpperCase();
    var sIcon = "";
    if (sAIResultUC == 'PASS') {
        sIcon = '/SmartInspections/Images/pass.png';
    } else if (sAIResultUC == 'FAIL') {
        sIcon = '/SmartInspections/Images/fail.png';
    } else if (sAIResultUC == 'CANNOT BE VERIFIED') {
        sIcon = '/SmartInspections/Images/notfound.png';
    } else if (sAIResultUC == 'NOT APPLICABLE') {
        sIcon = '/SmartInspections/Images/descope.png';
    }

    return sIcon;

}
