import libVal from './Common/ValidationLibrary';

export default function InspectionCharacteristicDetailsPage_PreInsp(context) {
	var binding = context.binding;

	if (!libVal.evalIsEmpty(binding.LastInspType)) {
		var lastInspTypeDesc = "PREVIOUS - " + binding.LastInspTypeDesc;
		return lastInspTypeDesc;
	} else {
		return '';
	}
}
