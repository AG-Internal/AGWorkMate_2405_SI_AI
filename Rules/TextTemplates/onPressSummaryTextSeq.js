/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { TextTemp } from "./TextTemp";
export default function onPressSummaryTextSeq(clientAPI) {

    let simpleProp = clientAPI.evaluateTargetPathForAPI('#Page:-Current/#Control:ResponseControl');
    let sValue = simpleProp.getValue();
    TextTemp.updateTextSeqCurrenRow(sValue); //Update it in Global

    return clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/ClosePage.action").then(function (param) {
        alert("Before Summarize");
        TextTemp.summarizeTextSeq();
        alert("After Summarize");
        clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/OpenTextSeqSummary.action");
    });

}
