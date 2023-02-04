export default function TechnicalObjectDetailsListPage_Sort(context) {
	let pageProxy = context.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	let wo = context.binding.OrderId;
	var finalQuery = "$filter=OrderNumber eq '" + wo + "'&$orderby=SortNumber, ListCounter";
	var inspCharQueryOptions = "$filter=OrderNumber eq '" + wo + "'";

	return context.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet', [], inspCharQueryOptions).then(
		function (results) {
			var inspCharObjects = [];
			if (results && results.length > 0) {
				results.forEach(function (value) {
					inspCharObjects.push(value);
				});
			}
			pageClientData.InspCharObjects = inspCharObjects;
			return finalQuery;
		});
}