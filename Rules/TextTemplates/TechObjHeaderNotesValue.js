/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import libVal from "../Common/ValidationLibrary";
export default function TechObjHeaderNotesValue(clientAPI) {
    var listPageClientData = undefined;
    var binding = undefined;
    try {
        listPageClientData = clientAPI.evaluateTargetPath("#Page:TechnicalObjectDetailsList/#ClientData");
        binding = listPageClientData.NavigatedTechObject;
    } catch (err) { }


    var sHeaderNotes = "";
    if (binding.LTLongText) {
        sHeaderNotes = binding.LTLongText.split('new_line').join('\n'); // Converted text
    } 
    return sHeaderNotes;
}

