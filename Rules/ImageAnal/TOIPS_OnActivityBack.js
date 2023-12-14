/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function TOIPS_OnActivityBack(clientAPI) {
    //Cancel back Action
    var appEventData = clientAPI.getAppEventData();
    if (appEventData) {
        appEventData.cancel = true;
    }

    clientAPI.executeAction("/SmartInspections/Actions/ImageAnal/TOIPS_CancelPrompt.action");

}