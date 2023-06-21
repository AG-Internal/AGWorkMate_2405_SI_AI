/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function CardTitles(clientAPI, psCallFrom) {
    //let workOrderContextAPI = clientAPI.evaluateTargetPathForAPI('#Page:WorkOrderDetailsPage');
    var sTitle = "";

    switch (psCallFrom) {
        case "OVP_INSPCOUNT":
            sTitle = "Inspections ({0})";
            //let SIOrdCount = workOrderContextAPI.count('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet');
            let SIOrdCount = clientAPI.count('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet');
            return SIOrdCount.then(function (count) {
                sTitle = sTitle.replace("{0}", count);
                return sTitle;
            });

        default: return " ";

    }
}
