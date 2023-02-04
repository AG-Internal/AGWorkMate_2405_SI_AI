export default function NavToInspectionHistoryDetailsList(clientAPI) {
	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	var binding = clientAPI.getPageProxy().getActionBinding();
	let odataID = binding['@odata.id'];
	var orderNumber = '';
	let technicalObject = '';
	var query = '';

	if (odataID.indexOf("WorkOrderHeaders") !== -1) {
		orderNumber = binding.OrderId;
		query = "$filter=OrderNumber eq '" + orderNumber + "'&$top=1";;
	} else if (odataID.indexOf("Equipments") !== -1) {
		technicalObject = binding.EquipId;
		query = "$filter=TechnicalObject eq '" + technicalObject + "'&$top=1";;
	} else if (odataID.indexOf("FunctionalLocations") !== -1) {
		technicalObject = binding.FuncLocId;
		query = "$filter=TechnicalObject eq '" + technicalObject + "'&$top=1";;
	} else {
		return false;
	}

	return clientAPI.read('/SmartInspections/Services/SAM.service', 'HistoryDetailsSet', [], query).then(
		function (results) {
			var planningPlant = '';
			if (results && results.length > 0) {
				results.forEach(function (value) {
					pageClientData.SelectedHistoryObject = value;
					if (value.HasMsg === true) {
						if (value.MessageType === 'E') {
							return clientAPI.executeAction('/SmartInspections/Actions/NavToInspectionHistory_ErrorMessage.action');
						} else if (value.MessageType === 'W') {
							return clientAPI.executeAction('/SmartInspections/Actions/NavToInspectionHistory_WarningMessage.action');
						} else {
							return clientAPI.executeAction('/SmartInspections/Actions/NavToInspectionHistory_OtherMessage.action');
						}
					} else {
						return clientAPI.executeAction('/SmartInspections/Actions/NavToInspectionHistoryDetailsList.action');
					}
				});
			}
		});
}