/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function onPressTOHeaderNotesCancel(clientAPI) {
    //Set Changed flagged in Client Data
    let pageProxy = clientAPI.getPageProxy();
    let pageClientData = pageProxy.getClientData();
    // Simple value assignment.
    if (pageClientData.isValueChanged) {
        //Show Prompt if value is changed
        clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/TechObjecHeaderNote_CancelPrompt.action");
    } else {
        //Close - if no change
        clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/ClosePage.action");
    }
}
