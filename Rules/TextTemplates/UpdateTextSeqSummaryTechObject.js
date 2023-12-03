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

   // var sTemplateID = TextTemp._oTemplateDetail.Header.TemplateID;
    var sSummarizedText = TextTemp._sSummarizedText;
    //Convert for Backend
    sSummarizedText = sSummarizedText.split('\n').join('new_line'); // Converted text

    //time stamps
    var isoDateTime = new Date().toISOString();
    var dateTime = isoDateTime.split(".");
    var time = dateTime[0].split("T");
    //Prepare and call update
    oLatestPromise = oLatestPromise.then(() => {
        //Template details
        if (TextTemp._saveCallFrom === "HEADERNOTES") {
            //From Header - just overwrite the Text
            binding.LTLongText = sSummarizedText;
        } else if (TextTemp._saveCallFrom === "TMPLSUMMARY") {
            //From Summary Append the text
            binding.LTTemplateID = TextTemp._oTemplateDetail.Header.TemplateID;;
            binding.LTLongText = binding.LTLongText + sSummarizedText;
        }
        // binding.LTTemplateID = sTemplateID;
        // binding.LTLongText = binding.LTLongText + sSummarizedText;
        //Save Status
        binding.Status = 'T';
        //Update Params
        binding.IsLTUpdated = true;
        binding.LTChangedOn = new Date().toISOString();
        binding.LTChangeTime = time[1];
        //Call update Entity
        return ExecuteUpdateEntity(clientAPI, binding);
    }).then(Wait);


    return oLatestPromise.then(function () {
        return clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/ClosePage.action");
    });
}
