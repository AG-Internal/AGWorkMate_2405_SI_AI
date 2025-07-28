/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import SICount from '../../../../SmartInspections/Rules/SmartInspection_TechnicalObjectCount.rule';
import InspHistCount from '../../../../SmartInspections/Rules/SmartInspection_TechnicalObjectCount_His.rule';

export default function CardTitles(clientAPI, psCallFrom) {
    //get Workorder page Context
  //  let workOrderContextAPI = clientAPI.evaluateTargetPathForAPI('#Page:WorkOrderDetailsPage');
    let workOrderContextAPI = clientAPI.evaluateTargetPathForAPI('#Page:WorkOrderDetailsWithObjectCardsPage');
    var sTitle = "";

    switch (psCallFrom) {
        case "SMART_INSPECTIONS":
            sTitle = "Smart Inspections ({0})";
            var oSI = SICount(workOrderContextAPI);
            return oSI.then(function (count) {
                sTitle = sTitle.replace("{0}", count);
                return sTitle;
            });

        case "INSP_HISTORY":
            sTitle = "Inspection History ({0})";
            var oInspHist = InspHistCount(workOrderContextAPI);
            return oInspHist.then(function (count) {
                sTitle = sTitle.replace("{0}", count);
                return sTitle;
            });

        default: return "";
    }
}
