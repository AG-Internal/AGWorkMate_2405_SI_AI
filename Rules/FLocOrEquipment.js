export default function FLocOrEquipment(context) {
	var binding = context.binding;
	if (binding.MicDescopeType !== '') {
		var technicalObject = binding.TechnicalObject + " (DESCOPED)";
		return technicalObject;
	} else {
		return binding.TechnicalObject;
	}
}