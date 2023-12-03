/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function CancelActivityBack(clientAPI) {
    var appEventData = clientAPI.getAppEventData();
    if (appEventData) {
        appEventData.cancel = true;
    }
}
