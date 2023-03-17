export default function DescopeTypeButton_SetEnabled(clientAPI) {
	var binding = clientAPI.getPageProxy().binding;
	var orderNumber = binding.OrderNumber;
	var technicalObject = binding.TechnicalObject;

	var workOrderQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "'";
	var workOrderPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet', [], workOrderQueryOptions).then(
		function (results) {
			var closeOrder = true;
			if (results && results.length > 0) {
				results.forEach(function (value) {
					if (value.CloseOrder === 'X') {
						closeOrder = false;
					}
				});
			}
			return closeOrder;
		});

	var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and TechnicalObject eq '" + technicalObject + "'";
	var inspCharPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet', [],
		inspCharQueryOptions).then(
		function (results) {
			var returnValue = true;
			if (results && results.length > 0) {
				results.forEach(function (value) {
					if (value.FixedValuesResult !== '' || value.MicDescopeType !== '') { //Added MicDescopeType for T019
						returnValue = false;
					}
				});
				return returnValue;
			}
		});

	return Promise.all([workOrderPromise, inspCharPromise]).then(function (values) {
		var workOrder = values[0];
		var inspChar = values[1];
		if (workOrder === false || inspChar === false) {
			return false;
		} else {
			return true;
		}
	});
}