/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function onPressTextSeqActivityBack(clientAPI) {
    var appEventData = clientAPI.getAppEventData();
    if (appEventData) {
        appEventData.cancel = true;
    }
    //Show Cancel
    clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/TextSeqCancelPrompt.action");
}
