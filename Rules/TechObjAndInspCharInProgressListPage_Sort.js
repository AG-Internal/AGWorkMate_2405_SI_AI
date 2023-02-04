export default function TechObjAndInspCharInProgressListPage_Sort(context) {
	var binding = context.binding;
	var orderNumber = binding.OrderId;
	var techObjQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "'";

	return context.read('/SmartInspections/Services/SAM.service', 'TechnicalObjectDetailsSet', [], techObjQueryOptions).then(
		function (results) {
			var finalQuery = "$filter=OrderNumber eq '" + orderNumber + "' and FixedValuesResult ne ''";
			var technicalObjects = [];
			var status = [];
			var inspectionTypes = [];
			var descopeTypes = [];

			if (results && results.length > 0) {
				results.forEach(function (value) {
					if (!(technicalObjects.includes(value.TechnicalObject))) {
						technicalObjects.push(value.TechnicalObject);
						status.push('');
						inspectionTypes.push('');
						descopeTypes.push('');
					}
					if (value.Status == 'P') {
						var index = technicalObjects.indexOf(value.TechnicalObject);
						status[index] = 'P';
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

				/*for (var i = 0; i < technicalObjects.length; i++) {
					if (status[i] !== 'P') {
						if (finalQuery.indexOf('TechnicalObject') !== -1) {
							finalQuery = finalQuery + " or TechnicalObject eq '" + technicalObjects[i] + "'";
						} else {
							finalQuery = finalQuery + " and (TechnicalObject eq '" + technicalObjects[i] + "'";
						}
					}
				}*/

				for (var i = 0; i < technicalObjects.length; i++) {
					if (status[i] !== 'P' && descopeTypes[i] === '') {
						if (finalQuery.indexOf('TechnicalObject') !== -1) {
							finalQuery = finalQuery + " or (TechnicalObject eq '" + technicalObjects[i] + "' and substringof('" + inspectionTypes[i] +
								"', InspectionTypes) eq true and MicDescopeType eq '')";
						} else {
							finalQuery = finalQuery + " and ((TechnicalObject eq '" + technicalObjects[i] + "' and substringof('" + inspectionTypes[i] +
								"', InspectionTypes) eq true and MicDescopeType eq '')";
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