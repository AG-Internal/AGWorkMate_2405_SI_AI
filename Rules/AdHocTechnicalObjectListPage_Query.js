export default function AdHocTechnicalObjectListPage_Query(context) {
	var binding = context.binding;
	var orderNumber = binding.OrderId;
	let pageProxy = context.getPageProxy();
	let myListPageClientData = '';

	var techObjQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "'";

	try {
		myListPageClientData = context.evaluateTargetPath("#Page:WorkOrderDetailsPage/#ClientData");
	} catch (err) {}
	
	var maintenancePlant = myListPageClientData.SelectedOrderOrig.MaintenancePlant;
	var planningPlant = myListPageClientData.SelectedOrderOrig.PlanningPlant;
	var equipmentFlag = myListPageClientData.SelectedOrderOrig.EquipmentFlag;
    
	return context.read('/SmartInspections/Services/SAM.service', 'TechnicalObjectDetailsSet', [], techObjQueryOptions).then(
		function (results) {
			var finalQuery = "$filter=MaintenancePlant eq '" + maintenancePlant + "' and EquipmentFlag eq '" + equipmentFlag +
				"' and IsProposed eq true";

			if (results && results.length > 0) {
				results.forEach(function (value) {
					finalQuery = finalQuery + " and TechnicalObject ne '" + value.TechnicalObject + "'";
				});
			}
			return finalQuery + "&$orderby=TechnicalObject";
		});
}