export default function InspectionHistoryDetailsList_StatusColor(sectionedTableProxy) {
	var binding = sectionedTableProxy.binding;
	var fixedValuesResult = binding.FixedValuesResult;
	var style = '';

	if (fixedValuesResult == 'PASS') {
		style = 'textColorPass';
	} else if (fixedValuesResult == 'FIX') {
		style = 'textColorFix';
	} else if (fixedValuesResult == 'FAIL') {
		style = 'textColorFail';
	} else {
		style = 'textColorNeutral';
	}

	return style;
}