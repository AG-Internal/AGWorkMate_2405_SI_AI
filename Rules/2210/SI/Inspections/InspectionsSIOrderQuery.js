
export default function InspectionsSIOrderQuery(clientAPI) {
    return clientAPI.read('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet', []).then(function (results) {

        //var sWoListODataQuery = "";
        //sWoListODataQuery = "$filter=OrderId eq '4000325' or OrderId eq '4000323'";
        //return sWoListODataQuery;

        //--Array Declaration:
        var aSiOrders = [];
        var sWoListODataQuery = "";
        var sSIOrderNumber = "";

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
                    sWoListODataQuery = "$filter=OrderId eq '{0}'";
                    //sWoListODataQuery = sWoListODataQuery.replace("{0}", value.OrderNumber);              
                    sWoListODataQuery = sWoListODataQuery.replace("{0}", value);

                } else { //For multiple SI Orders:
                    if (arrayIndex === 0) {
                        sWoListODataQuery = "$filter=OrderId eq '{0}'";
                        //sWoListODataQuery = sWoListODataQuery.replace("{0}", value.OrderNumber);
                        sWoListODataQuery = sWoListODataQuery.replace("{0}", value);
                    }

                    if (arrayIndex > 0) {
                        //Preparing the Additional Order numbers in the same Query as above:
                        let sWoAdditionalOrd = " or OrderId eq '{0}'";
                        sWoAdditionalOrd = sWoAdditionalOrd.replace("{0}", value);
                        sWoListODataQuery = sWoListODataQuery.concat(sWoAdditionalOrd);
                        //sWoAdditionalOrd = sWoAdditionalOrd.replace("{0}", value.OrderNumber);
                        //sWoListODataQuery = sWoListODataQuery.concat(sWoAdditionalOrd);
                    }

                }
            });
        } else { //When no SI WO present:            
            sWoListODataQuery = "$filter=OrderId eq '1234564'";
        }

        //Assigning to PageClient Data: Not required as of now
        //pageClientData.sWoListODataQuery = sWoListODataQuery;
        //pageClientData.aSiOrders = aSiOrders;
        
        return sWoListODataQuery;
    });
}