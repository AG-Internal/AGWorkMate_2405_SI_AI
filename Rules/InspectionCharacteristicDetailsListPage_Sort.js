/* Change Tag : SIV2203, Date:1-Nov-22, Description: EX Group, 
Changes: EX Related Logic
*/
export default function InspectionCharacteristicDetailsListPage_Sort(context) {
	var binding = context.binding;
	var orderNumber = binding.OrderNumber;
	var technicalObject = binding.TechnicalObject;
	var techObjQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and TechnicalObject eq '" + technicalObject + "'";

	return context.read('/SmartInspections/Services/SAM.service', 'TechnicalObjectDetailsSet', [], techObjQueryOptions).then(
		function (results) {
			//	var finalQuery = "$filter=OrderNumber eq '" + orderNumber + "'"; // Commented for SIV2203
			/*B.O.A by RB for SIV2203*/
			var finalQuery = "$filter=OrderNumber eq '" + orderNumber + "'" + " and DeleteFromWoSnap eq false";
			/*E.O.A by RB for SIV2203*/

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
					//if (descopeTypes[i] === '') {
					if (finalQuery.indexOf('TechnicalObject') !== -1) {
						finalQuery = finalQuery + " or (TechnicalObject eq '" + technicalObjects[i] + "' and substringof('" + inspectionTypes[i] +
							"', InspectionTypes) eq true)";
					} else {
						finalQuery = finalQuery + " and ((TechnicalObject eq '" + technicalObjects[i] + "' and substringof('" + inspectionTypes[i] +
							"', InspectionTypes) eq true)";
					}
					//}
				}

				if (finalQuery.indexOf('TechnicalObject') !== -1) {
					//finalQuery = finalQuery + ")"; //&$orderby=SortNumber, ListCounter, OperationNumber, InspectionCharacteristicNumb";
					finalQuery = finalQuery + ")&$orderby=OperationNumber, InspectionCharacteristicNumb";
				} else {
					//finalQuery = "$filter=OrderNumber eq 'NOORDER'&$orderby=SortNumber, ListCounter, OperationNumber, InspectionCharacteristicNumb";
					finalQuery = "$filter=OrderNumber eq 'NOORDER'&$orderby=OperationNumber, InspectionCharacteristicNumb";
				}

				return finalQuery;
			}
		});
}