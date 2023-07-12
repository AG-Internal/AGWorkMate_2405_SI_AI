/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
//import InspectionsSIOrderQuery from "../SI/Inspections/InspectionsSIOrderQuery";
import WOCountQuery from "../SI/Inspections/WOCountQuery";
export default function SIWorkOrderListViewCaption(clientAPI) {

    //Getting the App Client Data to get the Source of the triggering Point:
    let appClientData = clientAPI.getAppClientData();

    if (appClientData.triggeredFrom === "INSPECTIONS") {
        var sTitle = "Inspections ({0})";

        let SIOrdCount = clientAPI.count('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet');
        return SIOrdCount.then(function (count) {
            sTitle = sTitle.replace("{0}", count);
            return sTitle;
        });
    } else if (appClientData.triggeredFrom === "WORK_ORDERS") {

        var sTitle = "Work Orders ({0})";

        //Getting the OData Query for the STD Service:
        //let pageProxy = clientAPI.getPageProxy();
        //let appClientData = pageProxy.getAppClientData();

        //Setting Flag to be used in WO List View Query:
        //appClientData.triggeredFrom = "WORK_ORDERS";
        //appClientData.triggeredFrom = "WORK_ORDERS_OVP_TITLE";

        //return InspectionsSIOrderQuery(clientAPI).then(function (stdODataQuery) {
        return WOCountQuery(clientAPI).then(function (stdODataQuery) {
            let stdOrdCount = clientAPI.count('/SAPAssetManager/Services/AssetManager.service', 'MyWorkOrderHeaders', stdODataQuery);

            return stdOrdCount.then(function (count) {
                sTitle = sTitle.replace("{0}", count);
                return sTitle;
            });
        });
    }
}
