export default function InspectionHistoryDetailsList_Query(context) {
	let binding = context.binding;
	let odataID = binding['@odata.id'];
	let technicalObject = '';
	let orderNumber = '';

	if (odataID.indexOf("Equipments") !== -1) {
		technicalObject = binding.EquipId;
		return "$filter=TechnicalObject eq '" + technicalObject + "'&$orderby=OrderNumber desc,DescopedOn desc,ResultRecDate desc";
	} else if (odataID.indexOf("FunctionalLocations") !== -1) {
		technicalObject = binding.FuncLocId;
		return "$filter=TechnicalObject eq '" + technicalObject + "'&$orderby=OrderNumber desc,DescopedOn desc,ResultRecDate desc";
	} else if (odataID.indexOf("TechnicalObjectDetails") !== -1) {
		technicalObject = binding.TechnicalObject;
		return "$filter=TechnicalObject eq '" + technicalObject + "'&$orderby=OrderNumber desc,DescopedOn desc,ResultRecDate desc";
	} else {
		orderNumber = binding.OrderId;
		return "$filter=OrderNumber eq '" + orderNumber + "'&$orderby=OrderNumber desc,DescopedOn desc,ResultRecDate desc";
	}
}