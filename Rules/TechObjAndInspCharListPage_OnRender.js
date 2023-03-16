/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function TechObjAndInspCharListPage_OnRender(clientAPI) {
    /* Redraw 2 Times to get Screen updated */
    var pageclientData = clientAPI.getPageProxy().getClientData();

    if (!pageclientData.Action) {
        /* Use variable Action to control Redraw */
        pageclientData.Action = "";
    }

    if (pageclientData.Action === "") {
        /* Redraw First Time , set Action to REDRAW */
        pageclientData.Action = "REDRAW";
        clientAPI.getPageProxy().getControls()[0].redraw();
    } else if (pageclientData.Action === "REDRAW") {
        /* Redraw second Time , set Action to Done */
        pageclientData.Action = "DONE";
        clientAPI.getPageProxy().getControls()[0].redraw();
    } else if (pageclientData.Action === "DONE") {
        /* If Action is Done , Just Clear the Action */
        pageclientData.Action = "";
    }
}
