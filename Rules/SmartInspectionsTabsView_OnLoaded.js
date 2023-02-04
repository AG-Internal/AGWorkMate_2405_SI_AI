export default function SmartInspectionsTabsView_OnLoaded(clientAPI) {
	let pageProxy = clientAPI.getPageProxy();
	var binding = pageProxy.getBindingObject();
	var orderNumber = binding.OrderId;
	let pageClientData = pageProxy.getClientData();

	if (pageClientData.InspCharList == undefined) {
		pageClientData.InspCharList = [];
	}

	var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "'&$orderby=Index";

	return clientAPI.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet', [], inspCharQueryOptions).then(
		function (results) {
			if (results && results.length > 0) {
				results.forEach(function (value) {
					(pageClientData.InspCharList).push(value);
				});
			}
			return pageClientData.InspCharList;
		});
}