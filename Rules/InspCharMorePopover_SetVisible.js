export default function InspCharMorePopover_SetVisible(clientAPI) {
	var binding = clientAPI.getPageProxy().binding;
	var orderNumber = binding.OrderNumber;
	var technicalObject = binding.TechnicalObject;
	var inspectionSampleNumber = binding.InspectionSampleNumber;
	var fixedValuesResult = binding.FixedValuesResult;
	var micDescopeType = binding.MicDescopeType;
	var status = binding.Status;
	var techObjQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and TechnicalObject eq '" + technicalObject +
		"' and InspectionSampleNumber eq '" + inspectionSampleNumber + "'";

	return clientAPI.read('/SmartInspections/Services/SAM.service', 'TechnicalObjectDetailsSet', [], techObjQueryOptions).then(
		function (results) {
			var returnValue = '';
			//alert(techObjQueryOptions + " " + results.length);
			if (results && results.length > 0) {
				results.forEach(function (value) {
					//alert(status + " " + value.Status + " " + micDescopeType + " " + fixedValuesResult)
					if (status == 'P' || value.Status === 'P' || micDescopeType !== '' || fixedValuesResult === '') {
						returnValue = false;
					} else {
						returnValue = true;
					}
				});
				return returnValue;
			} else {
				returnValue = false;
				return returnValue;
			}
		});
}