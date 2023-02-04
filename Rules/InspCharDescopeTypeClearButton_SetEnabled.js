export default function InspCharDescopeTypeClearButton_SetEnabled(clientAPI) {
	var binding = clientAPI.getPageProxy().binding;
	var orderNumber = binding.OrderNumber;
	var technicalObject = binding.TechnicalObject;
	var inspectionSampleNumber = binding.InspectionSampleNumber;
	var micDescopeType = binding.MicDescopeType;
	var status = binding.Status;

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
			} else {
				closeOrder = false;
			}
			return closeOrder;
		});

	var techObjQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and TechnicalObject eq '" + technicalObject +
		"' and InspectionSampleNumber eq '" + inspectionSampleNumber + "'";
	var techObjPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'TechnicalObjectDetailsSet', [], techObjQueryOptions).then(
		function (results) {
			var returnValue = '';
			if (results && results.length > 0) {
				results.forEach(function (value) {
					if (status === 'P' || value.Status === 'P' || micDescopeType === '') {
						returnValue = false;
					} else {
						returnValue = true;
					}
				});
				return returnValue;
			}
		});

	return Promise.all([workOrderPromise, techObjPromise]).then(function (values) {
		var workOrder = values[0];
		var techObj = values[1];
		if (workOrder === false || techObj === false) {
			return false;
		} else {
			return true;
		}
	});
}