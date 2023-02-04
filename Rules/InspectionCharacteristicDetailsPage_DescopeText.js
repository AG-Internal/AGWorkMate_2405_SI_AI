import libVal from './Common/ValidationLibrary';

export default function InspectionCharacteristicDetailsPage_DescopeText(context) {
	var binding = context.binding;

	if (!libVal.evalIsEmpty(binding.DescopeType)) {
		var descopeType = 'DESCOPED';
		return descopeType;
	} else if (!libVal.evalIsEmpty(binding.MicDescopeType)) {
		var descopeType = 'DESCOPED';
		return descopeType;
	} else {
		return '';
	}
}