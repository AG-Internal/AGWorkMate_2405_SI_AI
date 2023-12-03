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
        //Provide Response
        clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/ConfigProvideResponse.action");
    } else {
        TextTemp.updateTextSeqCurrenRow(sValue); //Update it in Global
        //close the Modal and Open the Page Again
        return clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/ClosePage.action").then(function (param) {
            OpenTextSeq(clientAPI);
        });

    }

}
