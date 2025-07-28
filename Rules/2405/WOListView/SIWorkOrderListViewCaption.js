/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import WOCountQuery from "../SI/Inspections/WOCountQuery";
import WorkOrdersCount from "../../../../SAPAssetManager/Rules/WorkOrders/WorkOrdersCount";
export default function SIWorkOrderListViewCaption(clientAPI) {

    //Getting the App Client Data to get the Source of the triggering Point:
    //let appClientData = clientAPI.getAppClientData();
    let pageProxy = clientAPI.getPageProxy();
    let appClientData = pageProxy.getAppClientData();

    if (appClientData.triggeredFrom === "INSPECTIONS") {
        var sTitle = "Inspections ({0})";

        let SIOrdCount = clientAPI.count('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet');
        return SIOrdCount.then(function (count) {
            sTitle = sTitle.replace("{0}", count);
            return sTitle;
        });
    } else if (appClientData.triggeredFrom === "WORK_ORDERS_OVP_TITLE") {

        var sTitle = "Work Orders ({0})";
        sTitle = sTitle.replace("{0}", appClientData._countWorkOrder);//set in cardTitles

        return sTitle;

        // return WOCountQuery(clientAPI).then(function (stdODataQuery) {
        //     //   let stdOrdCount = clientAPI.count('/SAPAssetManager/Services/AssetManager.service', 'MyWorkOrderHeaders', stdODataQuery);
        //     let OVPContextAPI = clientAPI.evaluateTargetPathForAPI('#Page:OverviewPageNew');
        //     let stdOrdCount = WorkOrdersCount(OVPContextAPI, stdODataQuery);

        //     return stdOrdCount.then(function (count) {
        //         sTitle = sTitle.replace("{0}", count);
        //         return sTitle;
        //     });
        // });
    }
}
