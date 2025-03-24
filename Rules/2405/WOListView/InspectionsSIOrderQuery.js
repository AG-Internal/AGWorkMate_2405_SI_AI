
export default function InspectionsSIOrderQuery(clientAPI) {
    return clientAPI.read('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet', []).then(function (results) {

        //--Array Declaration:
        var aSiOrders = [];
        var sWoListODataQuery = "";
        var sSIOrderNumber = "";
        var sWoAdditionalOrd = "";

        //Fetching the App CLient Data to get the Source of the triggering Point:
        let appClientData = clientAPI.getAppClientData();

        //Using OData query builder:
        let queryBuilder = clientAPI.dataQueryBuilder();
        queryBuilder.select('*,OrderMobileStatus_Nav/*,WODocuments/DocumentID,WOPartners/Employee_Nav/EmployeeName,WOPartners/PartnerFunction,MarkedJob/PreferenceValue,WOPriority/PriorityDescription,WOPriority/Priority');
        queryBuilder.expand('WODocuments,WODocuments/Document,OrderMobileStatus_Nav/OverallStatusCfg_Nav,Operations,Operations/SubOperations,WOPriority,MarkedJob,UserTimeEntry_Nav,WOPartners,WOPartners/Employee_Nav');
        queryBuilder.orderBy('Priority,DueDate,OrderId,WODocuments/DocumentID,OrderMobileStatus_Nav/MobileStatus');

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
                    if (appClientData.triggeredFrom === "WORK_ORDERS" || appClientData.triggeredFrom === "WORK_ORDERS_OVP_TITLE") {
                        //fetching only the orders other than the SI Orders:    
                        sWoListODataQuery = "OrderId ne '{0}'";
                    } else if (appClientData.triggeredFrom === "INSPECTIONS") {
                        //fetching only the SI Orders:    
                        sWoListODataQuery = "OrderId eq '{0}'";
                    }
                    sWoListODataQuery = sWoListODataQuery.replace("{0}", value);
                    queryBuilder.filter(sWoListODataQuery);

                } else { //For multiple SI Orders:
                    if (arrayIndex === 0) {

                        //Building the Query Based on the Triggering Point:
                        if (appClientData.triggeredFrom === "WORK_ORDERS" || appClientData.triggeredFrom === "WORK_ORDERS_OVP_TITLE") {
                            //fetching only the orders other than the SI Orders:    
                            sWoListODataQuery = "OrderId ne '{0}'";
                        } else if (appClientData.triggeredFrom === "INSPECTIONS") {
                            //fetching only the SI Orders:    
                            sWoListODataQuery = "OrderId eq '{0}'";
                        }
                        sWoListODataQuery = sWoListODataQuery.replace("{0}", value);
                        queryBuilder.filter(sWoListODataQuery);
                    }

                    if (arrayIndex > 0) {
                        //Preparing the Additional Order numbers in the same Query as above:

                        //Building the Query Based on the Triggering Point:
                        if (appClientData.triggeredFrom === "WORK_ORDERS" || appClientData.triggeredFrom === "WORK_ORDERS_OVP_TITLE") {
                            //fetching only the orders other than the SI Orders:    
                            sWoAdditionalOrd = " and OrderId ne '{0}'";
                        } else if (appClientData.triggeredFrom === "INSPECTIONS") {
                            //fetching only the SI Orders:    
                            sWoAdditionalOrd = " or OrderId eq '{0}'";
                        }

                        sWoAdditionalOrd = sWoAdditionalOrd.replace("{0}", value);
                        sWoListODataQuery = sWoListODataQuery.concat(sWoAdditionalOrd);
                        queryBuilder.filter(sWoListODataQuery);
                    }

                }
            });
        } else { //When no SI WO present:     
            if (appClientData.triggeredFrom === "WORK_ORDERS" || appClientData.triggeredFrom === "WORK_ORDERS_OVP_TITLE") {
                
                sWoListODataQuery = "OrderId ne '1234564'";
                queryBuilder.filter(sWoListODataQuery);
            } else if (appClientData.triggeredFrom === "INSPECTIONS") {
                
                sWoListODataQuery = "OrderId eq '1234564'";
                queryBuilder.filter(sWoListODataQuery);
            }
        }

        //Assigning to PageClient Data: Not required as of now

        if (appClientData.triggeredFrom === "WORK_ORDERS_OVP_TITLE") { //For OVP WO Card title Return only the Query as TEXT.
            let sWoFilterText = "$filter=";
            sWoListODataQuery = sWoFilterText.concat(sWoListODataQuery);            
            return sWoListODataQuery;
        } else {                                                       //For OData Qury from WO Card/ Inspections Card return the OData object.                 
            return queryBuilder;
        }

    });
}