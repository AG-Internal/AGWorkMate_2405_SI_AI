export default function InspCharDescopeTypeButton_SetEnabled(clientAPI) {
	var binding = clientAPI.getPageProxy().binding;
	var orderNumber = binding.OrderNumber;
	var technicalObject = binding.TechnicalObject;
	var inspectionSampleNumber = binding.InspectionSampleNumber;
	var fixedValuesResult = binding.FixedValuesResult;
	var micDescopeType = binding.MicDescopeType;
	var status = binding.Status;
	var numberOfSamples = binding.NumberOfSamples;
	var micType = binding.MicType;

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
			var hasValue = '';
			if (results && results.length > 0) {
				results.forEach(function (value) {
					if (status === 'P' || value.Status === 'P' || fixedValuesResult !== '') {
						returnValue = false;
					} else {
						if (micType === '04') {
							for (var i = 1; i <= numberOfSamples; i++) {
								var controlName = 'SampleReading' + i;
								var sampleReadingControl = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:' + controlName);
								var sampleReading = sampleReadingControl.getValue();
								if (sampleReading !== '') {
									hasValue = 'X';
								}
							}
							if (hasValue === 'X') {
								returnValue = false;
							} else {
								returnValue = true;
							}
						} else {
							returnValue = true;
						}
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