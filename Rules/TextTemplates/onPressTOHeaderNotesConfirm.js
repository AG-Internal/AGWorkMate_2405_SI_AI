/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { TextTemp } from "./TextTemp";
import UpdateTextSeqSummaryTechObject from "./UpdateTextSeqSummaryTechObject";
export default function onPressTOHeaderNotesConfirm(clientAPI) {
    //get the Value
    let oProp = clientAPI.evaluateTargetPathForAPI('#Page:-Current/#Control:HeaderNotes');
    var sValue = oProp.getValue();
    //Set the Value in TextTemp Class
    TextTemp.setSummarizedText(sValue, "HEADERNOTES");
    //Update it
    UpdateTextSeqSummaryTechObject(clientAPI);
}
