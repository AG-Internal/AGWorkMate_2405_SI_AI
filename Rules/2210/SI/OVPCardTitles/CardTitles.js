/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
//import InspectionsSIOrderQuery from "../Inspections/InspectionsSIOrderQuery";
import WOCountQuery from "../Inspections/WOCountQuery";
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
            //alert('Count Initialized');            
            //var sODataContext = new ODataProviderProxy('AssetManager.service'); //New Logic for OVP Testing

            //alert(sODataContext.isInitialized());
            //Getting the OData Query for the STD Service:
            let pageProxy = clientAPI.getPageProxy();
            let appClientData = pageProxy.getAppClientData();

            //alert(appClientData.sSIWoCardTitleIntialized);
            if (!appClientData.sSIWoCardTitleIntialized) {                               //New Logic for OVP Testing                
                sTitle = "Work Orders (0)";                                            //New Logic for OVP Testing
                return sTitle;                                                         //New Logic for OVP Testing
            } else {                                                                   //New Logic for OVP Testing
                sTitle = "Work Orders ({0})";

                //Getting the OData Query for the STD Service:
                //let pageProxy = clientAPI.getPageProxy();
                //let appClientData = pageProxy.getAppClientData();

                //Setting Flag to be used in WO List View Query:
                //appClientData.triggeredFrom = "WORK_ORDERS_OVP_TITLE";

                //Calling the Std Service to get the count:
                //return InspectionsSIOrderQuery(clientAPI).then(function (stdODataQuery) {                   
                return WOCountQuery(clientAPI).then(function (stdODataQuery) {                    
                    let stdOrdCount = clientAPI.count('/SAPAssetManager/Services/AssetManager.service', 'MyWorkOrderHeaders', stdODataQuery);
                    
                    return stdOrdCount.then(function (count) {                        
                        sTitle = sTitle.replace("{0}", count);                        
                        return sTitle;
                    });
                });
            }                                                                          //New Logic for OVP Testing

        default: return " ";

    }
}
