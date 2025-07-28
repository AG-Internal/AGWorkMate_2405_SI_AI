/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import WOCountQuery from "../SI/Inspections/WOCountQuery";
import WorkOrdersCount from "../../../../SAPAssetManager/Rules/WorkOrders/WorkOrdersCount";
export default function CardTitles(clientAPI, psCallFrom) {
    var sTitle = "";
    var pageProxy = clientAPI.getPageProxy();
    var appClientData = pageProxy.getAppClientData();

    switch (psCallFrom) {
        case "OVP_INSPCOUNT":
            sTitle = "Inspections ({0})";

            let SIOrdCount = clientAPI.count('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet');
            return SIOrdCount.then(function (count) {
                // sTitle = sTitle.replace("{0}", count);
                sTitle = `${count}`
                return sTitle;
            });
        case "OVP_INSPCOUNT_SD":
            sTitle = "Inspections ({0})";

            let SIOrdCountSD = clientAPI.count('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet');
            return SIOrdCountSD.then(function (count) {
                sTitle = sTitle.replace("{0}", count);
                //sTitle = `${count}`
                return sTitle;
            });


        case "OVP_WOCOUNT":
            //Getting the OData Query for the STD Service:
            pageProxy = clientAPI.getPageProxy();
            appClientData = pageProxy.getAppClientData();

            if (!appClientData.sSIWoCardTitleIntialized) {
                sTitle = "Work Orders (0)";
                sTitle = "0";
                return sTitle;
            } else {                                                                  //New Logic for OVP Testing
                sTitle = "Work Orders ({0})";
                sTitle = "0";
                //Calling the Std Service to get the count:                
                return WOCountQuery(clientAPI).then(function (stdODataQuery) {
                    //  let stdOrdCount = clientAPI.count('/SAPAssetManager/Services/AssetManager.service', 'MyWorkOrderHeaders', stdODataQuery);
                    let OVPContextAPI = clientAPI.evaluateTargetPathForAPI('#Page:OverviewPageNew');
                    let stdOrdCount = WorkOrdersCount(OVPContextAPI, stdODataQuery);

                    return stdOrdCount.then(function (count) {
                        // sTitle = sTitle.replace("{0}", count);
                        sTitle = `${count}`
                        appClientData._countWorkOrder = count;
                        return sTitle;
                    });
                });
            }
        case "OVP_WOCOUNT_SD":
            //Getting the OData Query for the STD Service:
            pageProxy = clientAPI.getPageProxy();
            appClientData = pageProxy.getAppClientData();

            if (!appClientData.sSIWoCardTitleIntialized) {
                sTitle = "Work Orders (0)";
              //  sTitle = "0";
                return sTitle;
            } else {                                                                  //New Logic for OVP Testing
                sTitle = "Work Orders ({0})";
                //sTitle = "0";
                //Calling the Std Service to get the count:                
                return WOCountQuery(clientAPI).then(function (stdODataQuery) {
                    //  let stdOrdCount = clientAPI.count('/SAPAssetManager/Services/AssetManager.service', 'MyWorkOrderHeaders', stdODataQuery);
                    let OVPContextAPI = clientAPI.evaluateTargetPathForAPI('#Page:OverviewPageNew');
                    let stdOrdCount = WorkOrdersCount(OVPContextAPI, stdODataQuery);

                    return stdOrdCount.then(function (count) {
                        sTitle = sTitle.replace("{0}", count);
                        //sTitle = `${count}`
                        appClientData._countWorkOrder = count;
                        return sTitle;
                    });
                });
            }                                                                        //New Logic for OVP Testing

        default: return " ";

    }
}
