/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ClosePage(clientAPI) {
    //Close the Page using a timeout - Specifically for MODAL PAGES 
    setTimeout(function () { clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/ClosePage.action") }, 100);
}
