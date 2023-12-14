/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function TOIPS_LineSubStatusImage(clientAPI) {

    var binding = clientAPI.binding;
    var sAIResultUC = binding.AIResult.toUpperCase();
    var sIcon = "";
    if (sAIResultUC == 'PASS') {
        sIcon = '/SmartInspections/Images/PassGreen.png';
    } else if (sAIResultUC == 'FAIL') {
        sIcon = '/SmartInspections/Images/FailRed.png';
    } else if (sAIResultUC == 'CANNOT BE VERIFIED') {
        sIcon = '/SmartInspections/Images/NotFoundAmber.png';
    } else if (sAIResultUC == 'NOT APPLICABLE') {
        sIcon = '/SmartInspections/Images/DescopeGrey.png';
    }

    return sIcon;

}
