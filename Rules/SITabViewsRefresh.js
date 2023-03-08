/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function SITabViewsRefresh(clientAPI) {
    /* Redraw all the pages */
    var acontrols = [
        { page: "#Page:TechnicalObjectPermSaveList", control: "SectionedTable0" },
        { page: "#Page:TechObjAndInspCharInProgressList", control: "SectionedTable0" },
        { page: "#Page:TechObjAndInspCharOpenList", control: "SectionedTable0" },
        { page: "#Page:TechObjAndInspCharList", control: "SectionedTable0" }
    ];

    for (var i = 0; i < acontrols.length; i++) {
        clientAPI.evaluateTargetPathForAPI(acontrols[i].page).getControl(acontrols[i].control).redraw();
    }
}
