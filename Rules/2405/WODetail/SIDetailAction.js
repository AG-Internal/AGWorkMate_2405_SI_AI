/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import NavToSI from "../../../Rules/NavToSmartInspectionsTabsViewPage";

export default function SIDetailAction(clientAPI, psCallFrom) {
    //get Workorder page Context
   // let workOrderContextAPI = clientAPI.evaluateTargetPathForAPI('#Page:WorkOrderDetailsPage');
    let workOrderContextAPI = clientAPI.evaluateTargetPathForAPI('#Page:WorkOrderDetailsWithObjectCardsPage');


    switch (psCallFrom) {
        case "SMART_INSPECTION":
            NavToSI(workOrderContextAPI);
            break;

        case "FULL_DETAILS":
            workOrderContextAPI.executeAction("/SmartInspections/Actions/WorkMate/FullDetailsToNONWMwoPage.action");
            break;

        default: return "";
    }
}
