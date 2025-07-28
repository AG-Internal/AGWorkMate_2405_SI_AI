/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

export default function WOCountQuery(clientAPI) {
    return clientAPI.read('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet', []).then(function (results) {

        //--Array Declaration:
        var aSiOrders = [];
        var sWoListODataQuery = "";
        var sSIOrderNumber = "";
        var sWoAdditionalOrd = "";

        //--Collecting the SI Workorders:
        if (results && results.length > 0) {
            results.forEach(function (value) {
                if (value.OrderNumber !== sSIOrderNumber) {
                    sSIOrderNumber = value.OrderNumber;

                    //Collecting the SI Order Numbers in Array:    
                    aSiOrders.push(sSIOrderNumber);
                }
            });

            //Preparing the OData Query for the WO List View:                
            aSiOrders.forEach(function (value, arrayIndex) {
                if (aSiOrders.length === 1) { //For only one SI Order:

                    //Building the Query Based on the Triggering Point:
                    sWoListODataQuery = "$filter=OrderId ne '{0}'";

                    sWoListODataQuery = sWoListODataQuery.replace("{0}", value);

                } else { //For multiple SI Orders:
                    if (arrayIndex === 0) {

                        //Building the Query Based on the Triggering Point:
                        sWoListODataQuery = "$filter=OrderId ne '{0}'";

                        sWoListODataQuery = sWoListODataQuery.replace("{0}", value);

                    }

                    if (arrayIndex > 0) {
                        //Preparing the Additional Order numbers in the same Query as above:
                        //fetching only the orders other than the SI Orders:    
                        sWoAdditionalOrd = " and OrderId ne '{0}'";


                        sWoAdditionalOrd = sWoAdditionalOrd.replace("{0}", value);
                        sWoListODataQuery = sWoListODataQuery.concat(sWoAdditionalOrd);

                    }

                }
            });
        } else { //When no SI WO present:     
            sWoListODataQuery = "$filter=OrderId ne '1234564'";

        }
        return sWoListODataQuery;

    });
}
