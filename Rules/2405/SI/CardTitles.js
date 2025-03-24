/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import WOCountQuery from "../SI/Inspections/WOCountQuery";
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
            //Getting the OData Query for the STD Service:
            let pageProxy = clientAPI.getPageProxy();
            let appClientData = pageProxy.getAppClientData();

            if (!appClientData.sSIWoCardTitleIntialized) {                              //New Logic for OVP Testing                
                sTitle = "Work Orders (0)";                                            //New Logic for OVP Testing
                return sTitle;                                                         //New Logic for OVP Testing
            } else {                                                                   //New Logic for OVP Testing
                sTitle = "Work Orders ({0})";

                //Calling the Std Service to get the count:                
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
