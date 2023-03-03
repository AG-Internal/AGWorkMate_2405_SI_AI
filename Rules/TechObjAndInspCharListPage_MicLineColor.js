/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function TechObjAndInspCharListPage_MicLineColor(clientAPI) {
    var binding = clientAPI.binding;
	var fixedValuesResult = binding.FixedValuesResult;
	var style = '';

	if (fixedValuesResult == 'PASS') {
		style = 'micLineColorPass';
	} else if (fixedValuesResult == 'FIX') {
		style = 'micLineColorFix';
	} else if (fixedValuesResult == 'FAIL') {
		style = 'micLineColorFail';
	} else {
		style = 'micColorNeutral';
	}
	return style;
}
