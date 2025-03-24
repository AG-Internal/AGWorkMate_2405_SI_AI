/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
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

        return WOCountQuery(clientAPI).then(function (stdODataQuery) {
            let stdOrdCount = clientAPI.count('/SAPAssetManager/Services/AssetManager.service', 'MyWorkOrderHeaders', stdODataQuery);

            return stdOrdCount.then(function (count) {
                sTitle = sTitle.replace("{0}", count);
                return sTitle;
            });
        });
    }
}
