export default function InspectionHistoryDetailsList_SetVisible(context) {
	let binding = context.binding;
	let odataID = binding['@odata.id'];
	let technicalObject = '';
	let orderNumber = '';
	let historyDetailsQuery = '';

	if (odataID.indexOf("Equipments") !== -1) {
		technicalObject = binding.EquipId;
		historyDetailsQuery = "$filter=TechnicalObject eq '" + technicalObject + "'";
	} else if (odataID.indexOf("FunctionalLocations") !== -1) {
		technicalObject = binding.FuncLocId;
		historyDetailsQuery = "$filter=TechnicalObject eq '" + technicalObject + "'";
	} else {
		orderNumber = binding.OrderId;
		historyDetailsQuery = "$filter=OrderNumber eq '" + orderNumber + "'";
	}

	return context.count('/SmartInspections/Services/SAM.service', 'HistoryDetailsSet', historyDetailsQuery).then(function (count) {
		if (count > 0)
			return true;
		else
			return false;
	});
}