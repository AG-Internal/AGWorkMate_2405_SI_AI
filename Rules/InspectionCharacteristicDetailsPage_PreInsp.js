/*--------------------------------------------------------------------*
* Change Tag    :  CR005
*--------------------------------------------------------------------*/
import libVal from './Common/ValidationLibrary';

export default function InspectionCharacteristicDetailsPage_PreInsp(context) {
	var binding = context.binding;

	// if (!libVal.evalIsEmpty(binding.LastInspType)) {
	// 	var lastInspTypeDesc = "PREVIOUS - " + binding.LastInspTypeDesc;
	// 	return lastInspTypeDesc;
	// } else {
	// 	return '';
	// }
	//B.O.A for CR005
	var sFinalValue = "";
	if (!libVal.evalIsEmpty(binding.LastInspType)) {
		sFinalValue = binding.LastInspTypeDesc;
	}
	if (binding.LastInspDateChar) {
		sFinalValue = sFinalValue + ", " + binding.LastInspDateChar;
	}

	if (sFinalValue) {
		sFinalValue = "PREVIOUS - " + sFinalValue;
	}

	return sFinalValue;

	//B.O.A for CR005
}
