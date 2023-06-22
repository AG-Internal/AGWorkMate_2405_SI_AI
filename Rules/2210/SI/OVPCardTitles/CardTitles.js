/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import InspectionsSIOrderQuery from "../Inspections/InspectionsSIOrderQuery";
export default function CardTitles(clientAPI, psCallFrom) {
    var sTitle = "";

    switch (psCallFrom) {
        case "OVP_INSPCOUNT":
            sTitle = "Inspections ({0})";
            
            let SIOrdCount = clientAPI.count('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet');
            return SIOrdCount.then(function (count) {
                sTitle = sTitle.replace("{0}", count);
                return sTitle;
            });

        case "OVP_WOCOUNT":            

            sTitle = "Work Orders ({0})";

            //Getting the OData Query for the STD Service:
            let pageProxy = clientAPI.getPageProxy();
            let appClientData = pageProxy.getAppClientData();

            //Setting Flag to be used in WO List View Query:
            appClientData.triggeredFrom = "WORK_ORDERS";

            //Calling the Std Service to get the count:
            return InspectionsSIOrderQuery(clientAPI).then(function (stdODataQuery) {
                let stdOrdCount = clientAPI.count('/SAPAssetManager/Services/AssetManager.service', 'MyWorkOrderHeaders' , stdODataQuery);
                
                return stdOrdCount.then(function (count) {
                    sTitle = sTitle.replace("{0}" , count);
                    return sTitle;
                });
            });       
            
        default: return " ";

    }
}
