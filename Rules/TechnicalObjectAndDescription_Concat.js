import libVal from './Common/ValidationLibrary';

export default function TechnicalObjectAndDescription_Concat(context) {
	var binding = context.binding;
	if (!libVal.evalIsEmpty(binding.TechnicalObjectDescription)) {
		var techObject = binding.TechnicalObject;
		var desc = binding.TechnicalObjectDescription;
		var techObjectDesc = techObject + " - " + desc;
		//if (!libVal.evalIsEmpty(binding.DescopeTypeDesc)) {
		//	var techObjectDesc = techObject + " - " + desc + " (" + binding.DescopeTypeDesc + ")";
		//} else if (!libVal.evalIsEmpty(binding.MicDescopeDesc)) {
		//	var techObjectDesc = techObject + " - " + desc + " (" + binding.MicDescopeDesc + ")";
		//}
		return techObjectDesc;
	} else if (libVal.evalIsEmpty(binding.FunctionalLocation)) {
		var techObject = binding.TechnicalObject;
		var desc = binding.EquipmentDescription;
		var techObjectDesc = techObject + " - " + desc;
		//if (!libVal.evalIsEmpty(binding.DescopeTypeDesc)) {
		//	var techObjectDesc = techObject + " - " + desc + " (" + binding.DescopeTypeDesc + ")";
		//} else if (!libVal.evalIsEmpty(binding.MicDescopeDesc)) {
		//	var techObjectDesc = techObject + " - " + desc + " (" + binding.MicDescopeDesc + ")";
		//}
		return techObjectDesc;
	} else {
		var techObject = binding.TechnicalObject;
		var desc = binding.FunctionalLocationDesc;
		var techObjectDesc = techObject + " - " + desc;
		//if (!libVal.evalIsEmpty(binding.DescopeTypeDesc)) {
		//	var techObjectDesc = techObject + " - " + desc + " (" + binding.DescopeTypeDesc + ")";
		//} else if (!libVal.evalIsEmpty(binding.MicDescopeDesc)) {
		//	var techObjectDesc = techObject + " - " + desc + " (" + binding.MicDescopeDesc + ")";
		//}
		return techObjectDesc;
	}
}