/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ChatGPTInputPage_OnActivityBack(clientAPI) {
    var appEventData = clientAPI.getAppEventData();
    if (appEventData) {
        appEventData.cancel = true;
    }
    //Show Cancel
    clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/ChatGPT_CancelPrompt.action");
}
