export default function NavToClassifications(clientAPI) {
	/*var binding = clientAPI.getPageProxy().getBindingObject();
	var equipmentFlag = binding.EquipmentFlag;
	var technicalObject = binding.TechnicalObject;
	var entitySet = 'MyEquipments(\'' + technicalObject + '\')/Classes';
	var query = "";//"'$top=1";*/
	return clientAPI.executeAction('/SmartInspections/Actions/NavToClassifications.action');
	//alert(entitySet);
	/*return clientAPI.read('/SmartInspections/Services/AssetManager.service', 'MyEquipments(\'' + technicalObject + '\')/Classes', [],
		query).then(
		function (results) {
			alert(results.length);
			if (results && results.length > 0) {
				results.forEach(function (value) {
					alert(Object.entries(value));
				});
			}
		});*/

	//return Promise.all([requestPromise]).then(function (counts) {});
}