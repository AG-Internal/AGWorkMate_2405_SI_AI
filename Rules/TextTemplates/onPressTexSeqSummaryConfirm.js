/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { TextTemp } from "./TextTemp";
export default function onPressTexSeqSummaryConfirm(clientAPI) {
    let oProp = clientAPI.evaluateTargetPathForAPI('#Page:-Current/#Control:SummarizedText');
    var sValue = oProp.getValue();
    TextTemp.setSummarizedText(sValue);

    clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/ClosePage.action");
}
