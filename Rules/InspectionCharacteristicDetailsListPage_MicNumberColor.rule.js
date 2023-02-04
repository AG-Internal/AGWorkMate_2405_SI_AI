export default function InspectionCharacteristicDetailsListPage_MicNumberColor(sectionedTableProxy) {
	var binding = sectionedTableProxy.binding;
	var orderNumber = binding.OrderNumber;
	var technicalObject = binding.TechnicalObject;
	var inspectionSampleNumber = binding.InspectionSampleNumber;
	var operationNumber = binding.OperationNumber;
	var inspectionCharacteristicNumb = binding.InspectionCharacteristicNumb;
	var micNumber = binding.MicNumber;
	var micDescopeType = binding.MicDescopeType;
	var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and TechnicalObject eq '" + technicalObject +
		"' and InspectionSampleNumber eq '" + inspectionSampleNumber + "' and OperationNumber eq '" + operationNumber +
		"' and InspectionCharacteristicNumb eq '" + inspectionCharacteristicNumb + "' and MicNumber eq '" + micNumber + "'";

	return sectionedTableProxy.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet', [], inspCharQueryOptions).then(
		function (results) {
			var style = 'textColorNeutral';
			if (results && results.length > 0) {
				results.forEach(function (value) {
					if (value.FixedValuesResult == 'PASS') {
						style = 'textColorPass';
					} else if (value.FixedValuesResult == 'FIX') {
						style = 'textColorFix';
					} else if (value.FixedValuesResult == 'FAIL') {
						style = 'textColorFail';
					} else if (value.micDescopeType !== '') {
						style = 'textColorGrey';
					} else {
						style = 'textColorNeutral';
					}
				});
				return style;
			} else {
				return style;
			}
		});
}