/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import libVal from './Common/ValidationLibrary';
export default function TechnicalObjectDetailsListPage_Desc(context) {
	var binding = context.binding;

	var sText = binding.InspectionTypeDesc;
	if(binding.ExGrpDesc){
		if(sText){
			sText = sText + ",";
		}
		sText = sText + binding.ExGrpDesc;
	}
	return sText;
}