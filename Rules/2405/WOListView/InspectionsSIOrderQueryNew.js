export default function InspectionsSIOrderQueryNew(clientAPI) {
    return clientAPI.read('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet', []).then(function (results) {
        // Array to collect SI order numbers
        let aSiOrders = [];
        let sWoListODataQuery = '';
        
        // Get app client data for trigger context
        const appClientData = clientAPI.getAppClientData();
        const triggerFrom = appClientData.triggeredFrom;

        // Collect unique SI OrderNumbers
        if (results && results.length > 0) {
            results.forEach(item => {
                if (aSiOrders.indexOf(item.OrderNumber) === -1) {
                    aSiOrders.push(item.OrderNumber);
                }
            });
            // Build filter expression
            aSiOrders.forEach((orderId, idx) => {
                let expr = triggerFrom === 'INSPECTIONS'
                    ? `OrderId eq '${orderId}'`
                    : `OrderId ne '${orderId}'`;

                if (idx > 0) {
                    // For multiple orders, combine with OR for INSPECTIONS, AND for others
                    const conjunction = triggerFrom === 'INSPECTIONS' ? ' or ' : ' and ';
                    sWoListODataQuery += conjunction + expr;
                } else {
                    sWoListODataQuery = expr;
                }
            });
        } else {
            // No SI orders: use dummy filter to exclude/include nothing
            sWoListODataQuery = triggerFrom === 'INSPECTIONS'
                ? "OrderId eq '1234564'"
                : "OrderId ne '1234564'";
        }

        // Return plain filter expression (no "$filter= ")
        return sWoListODataQuery;
    });
}
