/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import libVal from "../Common/ValidationLibrary";
export default function ConfigPageObjHeadline(clientAPI) {
    var listPageClientData = undefined;
    var binding = undefined;
    try {
        listPageClientData = clientAPI.evaluateTargetPath("#Page:TechnicalObjectDetailsList/#ClientData");
        binding = listPageClientData.NavigatedTechObject;
    } catch (err) { }
    //Formate Text
	if (!libVal.evalIsEmpty(binding.OrderNumber)) {
		var OrderNumber = binding.OrderNumber;
		var OrderDescription = binding.OrderDescription;
		var OrdDesc = OrderNumber + " - " + OrderDescription;
		return OrdDesc;
	} 
    return "Order Number";
}
