import libVal from './Common/ValidationLibrary';

export default function InspectionCharacteristicDetailsPage_DescopeIcon(context) {
	var binding = context.binding;
	var iconImage = '';

	if (!libVal.evalIsEmpty(binding.DescopeType)) {
		iconImage = 'sap-icon://delete';
		return iconImage;
	} else if (!libVal.evalIsEmpty(binding.MicDescopeType)) {
		iconImage = 'sap-icon://delete';
		return iconImage;
	} else {
		return iconImage;
	}
}