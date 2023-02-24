/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function InspectionCharacteristicDetailsListPage_MicLineColor(clientAPI) {

    var binding = clientAPI.binding;
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

	return clientAPI.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet', [], inspCharQueryOptions).then(
		function (results) {
			var style = 'micColorNeutral';
			if (results && results.length > 0) {
				results.forEach(function (value) {
					if (value.FixedValuesResult == 'PASS') {
						style = 'micLineColorPass';
						
					} else if (value.FixedValuesResult == 'FIX') {
						style = 'micLineColorFix';
					
					} else if (value.FixedValuesResult == 'FAIL') {
						style = 'micLineColorFail';
						
					} else if (value.micDescopeType !== '') {
						style = 'micLineColorDescope';
						
					} else {
						style = 'micColorNeutral';
					}
				});
				return style;
			} else {
				return style;
			}
		});

}
