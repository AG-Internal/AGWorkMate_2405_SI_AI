export default function TechObjAndInspCharListPage_Sort(context) {
	/*let wo = context.binding.OrderId;
	return "$filter=OrderNumber eq '" + wo + "'&$orderby=SortNumber, ListCounter, OperationNumber, InspectionCharacteristicNumb";*/
	var binding = context.binding;
	var orderNumber = binding.OrderId;
	var techObjQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "'";

	return context.read('/SmartInspections/Services/SAM.service', 'TechnicalObjectDetailsSet', [], techObjQueryOptions).then(
		function (results) {
			var finalQuery = "$filter=OrderNumber eq '" + orderNumber + "'";
			var technicalObjects = [];
			var inspectionTypes = [];
			var descopeTypes = [];

			if (results && results.length > 0) {
				results.forEach(function (value) {
					if (!(technicalObjects.includes(value.TechnicalObject))) {
						technicalObjects.push(value.TechnicalObject);
						inspectionTypes.push('');
						descopeTypes.push('');
					}
					if (value.InspectionType !== '') {
						var index = technicalObjects.indexOf(value.TechnicalObject);
						inspectionTypes[index] = value.InspectionType;
					}
					if (value.DescopeType !== '') {
						var index = technicalObjects.indexOf(value.TechnicalObject);
						descopeTypes[index] = value.DescopeType;
					}
				});

				for (var i = 0; i < technicalObjects.length; i++) {
					if (descopeTypes[i] === '') {
						if (finalQuery.indexOf('TechnicalObject') !== -1) {
							finalQuery = finalQuery + " or (TechnicalObject eq '" + technicalObjects[i] + "' and substringof('" + inspectionTypes[i] +
								"', InspectionTypes) eq true)";
						} else {
							finalQuery = finalQuery + " and ((TechnicalObject eq '" + technicalObjects[i] + "' and substringof('" + inspectionTypes[i] +
								"', InspectionTypes) eq true)";
						}
					}
				}
				
				if (finalQuery.indexOf('TechnicalObject') !== -1) {
					finalQuery = finalQuery + ")&$orderby=SortNumber, ListCounter, OperationNumber, InspectionCharacteristicNumb";
				} else {
					finalQuery = "$filter=OrderNumber eq 'NOORDER'&$orderby=SortNumber, ListCounter, OperationNumber, InspectionCharacteristicNumb";
				}
				
				return finalQuery;
			}
		});
}