/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { TextTemp } from "./TextTemp";
function ExecuteUpdateEntity(clientAPI, binding) {
    clientAPI.getPageProxy().setActionBinding(binding);
    return clientAPI.executeAction('/SmartInspections/Actions/TextTemplates/TechnicalObjectLTLongText_UpdateEntity.action');
}
function Wait() {
    return new Promise(r => setTimeout(r, 2000))
}
export default function UpdateTextSeqSummaryTechObject(clientAPI) {

    /* Update Smarrized Text to Technical Object */
    var binding = undefined;
    var oLatestPromise = Promise.resolve();
    var listPageClientData = undefined;
    //read the binding
    try {
        listPageClientData = clientAPI.evaluateTargetPath("#Page:TechnicalObjectDetailsList/#ClientData");
        binding = listPageClientData.NavigatedTechObject;
    } catch (err) { }

    var sTemplateID = TextTemp._oTemplateDetail.Header.TemplateID;
    var sSummarizedText = TextTemp._sSummarizedText;

    //Prepare and call update
    oLatestPromise = oLatestPromise.then(() => {
        binding.LTTemplateID = sTemplateID;
        binding.LTLongText = sSummarizedText.split('\n').join('new_line');
        binding.Status = 'T';
        alert(binding.LTLongText);
        return ExecuteUpdateEntity(clientAPI, binding);
    }).then(Wait);


    return oLatestPromise.then(function () {
        return clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/ClosePage.action");
    });
}
