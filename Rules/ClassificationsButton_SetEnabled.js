export default function ClassificationsButton_SetEnabled(clientAPI) {
	var binding = clientAPI.getPageProxy().binding;
	var orderNumber = binding.OrderNumber;
	var technicalObject = binding.TechnicalObject;
	var descopeType = binding.DescopeType;
	var techStatus = binding.Status;

	var workOrderQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "'";
	return clientAPI.read('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet', [], workOrderQueryOptions).then(
		function (results) {
			var status = true;
			if (results && results.length > 0) {
				results.forEach(function (value) {
					if (value.CloseOrder === 'X' || techStatus === 'P') {
						status = false;
					} else {
						status = true;
					}
				});
				return status;
			}
			return status;
		});
}