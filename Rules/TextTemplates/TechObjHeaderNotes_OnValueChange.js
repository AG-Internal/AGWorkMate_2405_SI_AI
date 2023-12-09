/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function TechObjHeaderNotes_OnValueChange(clientAPI) {
    //Set Changed flagged in Client Data
    let pageProxy = clientAPI.getPageProxy();
    let pageClientData = pageProxy.getClientData();
    // Simple value assignment.
    pageClientData.isValueChanged = true;
}
