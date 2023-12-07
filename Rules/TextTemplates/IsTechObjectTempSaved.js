/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function IsTechObjectTempSaved(clientAPI) {
    //return ture if tech object is not Permanently saved
    var bIsTempSaved = true;
    var listPageClientData = undefined;
    var binding = undefined;
    //read the list page Data
    try {
        listPageClientData = clientAPI.evaluateTargetPath("#Page:TechnicalObjectDetailsList/#ClientData");
        binding = listPageClientData.NavigatedTechObject;
    } catch (err) { }

    if (binding.Status === 'P') {
        bIsTempSaved = false;
    }
    return bIsTempSaved;
}
