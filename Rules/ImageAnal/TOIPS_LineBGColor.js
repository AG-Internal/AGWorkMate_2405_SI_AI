/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function TOIPS_LineBGColor(clientAPI) {
    var binding = clientAPI.binding;
    var sAIResultUC = binding.AIResult.toUpperCase();

    var style = 'aiLineColorNoResult';
    if (sAIResultUC == 'PASS') {
        style = 'aiLineColorPass';
    } else if (sAIResultUC == 'FAIL') {
        style = 'aiLineColorFail';
    } else if (sAIResultUC == 'CANNOT BE VERIFIED') {
        style = 'aiLineColorNoResult';
    } else if (sAIResultUC == 'NOT APPLICABLE') {
        style = 'aiLineColorDescope';
    } 

    return style;
}
