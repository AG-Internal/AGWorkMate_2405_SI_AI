export default function NavToSmartInspectionsTabsViewPage(clientAPI) {
	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	//var binding = clientAPI.getPageProxy().getActionBinding();
	var binding = clientAPI.getPageProxy().binding;
	var orderNumber = binding.OrderId;
	var query = "$filter=OrderNumber eq '" + orderNumber + "'";

	var workOrderHeaderPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet', [], query).then(
		function (results) {
			var planningPlant = '';
			if (results && results.length > 0) {
				results.forEach(function (value) {
					pageClientData.SelectedOrderOrig = value;
				});
			}
		});

	var inspCharDetailsPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet', [],
		query).then(
		function (results) {
			pageClientData.OperationNumbersOrig = [];
			var uniqueOperations = [];
			if (results && results.length > 0) {
				results.forEach(function (value) {
					var operationNumber = value.OperationNumber;
					var operationShortText = value.OperationShortText;
					if (!uniqueOperations.includes(operationNumber)) {
						var operation = {
							OperationNumber: operationNumber,
							OperationShortText: operationShortText
						}
						uniqueOperations.push(operationNumber);
						pageClientData.OperationNumbersOrig.push(operation);
					}
				});
			}
		});

	return Promise.all([workOrderHeaderPromise, inspCharDetailsPromise]).then(function (data) {
		var techObjDetails = data[0];
		var inspCharDetails = data[1];

		if (pageClientData.SelectedOrderOrig.HasMsg === true) {
			if (pageClientData.SelectedOrderOrig.MessageType === 'E') {
				return clientAPI.executeAction('/SmartInspections/Actions/NavToSmartInspectionsTabs_ErrorMessage.action');
			} else if (pageClientData.SelectedOrderOrig.MessageType === 'W') {
				return clientAPI.executeAction('/SmartInspections/Actions/NavToSmartInspectionsTabs_WarningMessage.action');
			} else {
				return clientAPI.executeAction('/SmartInspections/Actions/NavToSmartInspectionsTabs_OtherMessage.action');
			}
		} else {
			return clientAPI.executeAction('/SmartInspections/Actions/NavToSmartInspectionsTabsViewPage.action');
		}
	});
}