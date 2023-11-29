/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { TextTemp } from "./TextTemp";
import OpenTextSeq from "./OpenTextSeq";
import ClosePage from "./ClosePage";
export default function onPressNextTextSeq(clientAPI) {
    //get the response value
    let simpleProp = clientAPI.evaluateTargetPathForAPI('#Page:-Current/#Control:ResponseControl');
    let sValue = simpleProp.getValue();

    if (!sValue) {
        alert("Please provide Response");
        return;
    }

    var sTempMsg = "Before - " + TextTemp.PageTextSeq.Item.ResponseText;

    TextTemp.updateTextSeqCurrenRow(sValue); //Update it in Global
    
    sTempMsg = sTempMsg + "\n" + "After - " + TextTemp.PageTextSeq.Item.ResponseText;
    sTempMsg = sTempMsg + "\n" + "In Array - " + TextTemp._oTemplateDetail.Items[TextTemp.PageTextSeq.CurrIndex].ResponseText;
   
   // alert(sTempMsg);

    //close the Modal and Open the Page Again
    return clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/ClosePage.action").then(function (param) {
        OpenTextSeq(clientAPI);
    });



}
