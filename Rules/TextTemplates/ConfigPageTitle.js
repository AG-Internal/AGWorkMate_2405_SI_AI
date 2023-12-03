/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import libVal from "../Common/ValidationLibrary";
export default function ConfigPageTitle(clientAPI) {
    //Read Client Page Data
    var listPageClientData = undefined;
    var binding = undefined;
    try {
        listPageClientData = clientAPI.evaluateTargetPath("#Page:TechnicalObjectDetailsList/#ClientData");
        binding = listPageClientData.NavigatedTechObject;
    } catch (err) { }
    //Formate Text
	if (!libVal.evalIsEmpty(binding.TechnicalObjectDescription)) {
		var techObject = binding.TechnicalObject;
		var desc = binding.TechnicalObjectDescription;
		var techObjectDesc = techObject + " - " + desc;
		return techObjectDesc;
	} else if (libVal.evalIsEmpty(binding.FunctionalLocation)) {
		var techObject = binding.TechnicalObject;
		var desc = binding.EquipmentDescription;
		var techObjectDesc = techObject + " - " + desc;

		return techObjectDesc;
	} else {
		var techObject = binding.TechnicalObject;
		var desc = binding.FunctionalLocationDesc;
		var techObjectDesc = techObject + " - " + desc;

		return techObjectDesc;
	}
}
