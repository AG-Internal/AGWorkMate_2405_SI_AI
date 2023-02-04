import libVal from './Common/ValidationLibrary';

export default function FLocOrEquipmentDesc(context) {
	var binding = context.binding;
	if (libVal.evalIsEmpty(binding.FunctionalLocation)) {
		if (binding.DescopeType !== '') {
			var equipmentDescription =  binding.EquipmentDescription + " (DESCOPED)";
			return equipmentDescription;
		} else {
			return binding.EquipmentDescription;
		}
	} else {
		if (binding.DescopeType !== '') {
			var functionalLocationDesc = binding.FunctionalLocationDesc + " (DESCOPED)";
			return functionalLocationDesc;
		} else {
			return binding.FunctionalLocationDesc;
		}
	}
}