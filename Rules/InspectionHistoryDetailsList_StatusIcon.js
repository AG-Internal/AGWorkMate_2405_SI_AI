export default function InspectionHistoryDetailsList_StatusIcon(sectionedTableProxy) {
	var binding = sectionedTableProxy.binding;
	var fixedValuesResult = binding.FixedValuesResult;
	var isDescoped = binding.IsDescoped;
	var iconImage = [];

	if (fixedValuesResult == 'PASS') {
		iconImage.push('sap-icon://message-success');
	} else if (fixedValuesResult == 'FIX') {
		iconImage.push('sap-icon://message-warning');
	} else if (fixedValuesResult == 'FAIL') {
		iconImage.push('sap-icon://message-error');
	} else {
		if (isDescoped === true) {
			iconImage.push('sap-icon://delete');
		} else {
			iconImage.push('sap-icon://pending');
		}
	}

	return iconImage;
}