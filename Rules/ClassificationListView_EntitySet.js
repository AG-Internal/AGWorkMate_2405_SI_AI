export default function ClassificationListView_EntitySet(context) {
	let entityType = context.binding['@odata.type'];
	let readLink = context.binding['@odata.readLink'];
	var entitySet = '';

	if (entityType === '#sap_mobile.MyEquipment') {
		entitySet = readLink + '/Classes';
	} else if (entityType === '#sap_mobile.MyFunctionalLocation') {
		entitySet = readLink + '/Classes';
	} else {
		var binding = context.binding;
		var technicalObject = binding.TechnicalObject;
		var equipmentFlag = binding.EquipmentFlag;
		var equipment = binding.Equipment;
		var functionalLocationInt = binding.FunctionalLocationInt;
		if (equipmentFlag === 'X') {
			entitySet = 'MyEquipments(\'' + equipment + '\')/Classes';
		} else {
			entitySet = 'MyFunctionalLocations(\'' + functionalLocationInt + '\')/Classes';
		}
	}
	return entitySet;
}