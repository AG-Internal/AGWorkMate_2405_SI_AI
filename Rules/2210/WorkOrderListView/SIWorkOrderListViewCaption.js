/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function SIWorkOrderListViewCaption(clientAPI) {
    var sTitle = "Work Orders ({0})";
    let SIOrdCount = clientAPI.count('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet');
    return SIOrdCount.then(function (count) {
        sTitle = sTitle.replace("{0}", count);
        return sTitle;
    });

}
