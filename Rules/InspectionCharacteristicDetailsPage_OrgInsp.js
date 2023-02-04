/* Change Tag : SIV2203, Date:1-Nov-22, Description: EX Group, 
Changes: EX Related Logic
*/
import libVal from './Common/ValidationLibrary';

export default function InspectionCharacteristicDetailsPage_OrgInsp(context) {
	var binding = context.binding;
	/*B.O.Comment by RB for SIV2203*/
	// if (!libVal.evalIsEmpty(binding.InspectionTypeOrg)) {
	// 	var inspectionTypeOrgDesc = "ORIGINAL - " + binding.InspectionTypeOrgDesc;
	// 	return inspectionTypeOrgDesc;
	// } else {
	// 	return '';
	// }
	/*E.O.Comment by RB for SIV2203*/
	/*B.O.A by RB for SIV2203*/
	var value = '';
	if (!libVal.evalIsEmpty(binding.InspectionTypeOrg)) {
		value = "ORIGINAL - " + binding.InspectionTypeOrgDesc;
	}
	if (binding.ExGrpOrgDesc) {
		if (value) {
			value = value + ", ";
		} else {
			value = "ORIGINAL - ";
		}
		value = value + binding.ExGrpOrgDesc;
	}
	return value;
	/*E.O.A by RB for SIV2203*/
}