/* Change Tag : SIV2203, Date:1-Nov-22, Description: EX Group, 
Changes: EX Related Logic
*/
import libVal from './Common/ValidationLibrary';

export default function InspectionCharacteristicDetailsPage_CurInsp(context) {
	var binding = context.binding;
	var value = '';

	if (!libVal.evalIsEmpty(binding.InspectionType)) {
		value = "CURRENT - " + binding.InspectionTypeDesc + "";
	}
	/*B.O.A by RB for SIV2203*/
	if (binding.ExGrpDesc) {
		if (value) {
			value = value + ", ";
		}
		value = value + binding.ExGrpDesc;
	}
	/*E.O.A by RB for SIV2203*/

	if (!libVal.evalIsEmpty(binding.DescopeType)) {
		value = value + "(DESCOPED - " + binding.DescopeTypeDesc + ")";
	} else if (!libVal.evalIsEmpty(binding.MicDescopeType)) {
		value = value + "(DESCOPED - " + binding.MicDescopeDesc + ")";
	}
	return value;
}