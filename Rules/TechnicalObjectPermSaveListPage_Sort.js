/* Change Tag : SIV2203, Date:1-Nov-22, Description: EX Group, 
Changes: EX Related Logic
*/
export default function TechnicalObjectPermSaveListPage_Sort(context) {
	var binding = context.binding;
	var orderNumber = binding.OrderId;
	var techObjQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and DescopeType  eq '' and Status ne 'P'";
	//	var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "'"; //Commented for SIV2203
	/*B.O.A by RB for SIV2203*/
	var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "'" + " and DeleteFromWoSnap eq false";
	/*E.O.A by RB for SIV2203*/
	var techObjDetailsPromise = context.read('/SmartInspections/Services/SAM.service', 'TechnicalObjectDetailsSet', [],
		techObjQueryOptions).then(
		function (results) {
			var technicalObjects = [];
			if (results && results.length > 0) {
				results.forEach(function (value) {
					var techObject = value.TechnicalObject;
					var inspType = value.InspectionType;
					var inspectionType = {
						TechnicalObject: techObject,
						InspectionType: inspType
					};
					technicalObjects.push(inspectionType);
				});
				return technicalObjects;
			}
			return technicalObjects;
		});

	var inspCharDetailsPromise = context.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet', [],
		inspCharQueryOptions).then(
		function (results) {
			var InspChar = [];
			if (results && results.length > 0) {
				results.forEach(function (value) {
					var inspTypes = value.InspectionTypes;
					var inspTypesArray = inspTypes.split(",");
					var inspectionTypes = {};
					for (var i = 0; i < inspTypesArray.length; i++) {
						var techObject = value.TechnicalObject;
						if (value.FixedValuesResult === '' && value.MicDescopeType === '') {
							inspectionTypes = {
								TechnicalObject: techObject,
								InspectionType: inspTypesArray[i],
								ResultsRecorded: ''
							};
						} else {
							inspectionTypes = {
								TechnicalObject: techObject,
								InspectionType: inspTypesArray[i],
								ResultsRecorded: 'X'
							};
						}
						InspChar.push(inspectionTypes);
					}
				});
				return InspChar;
			}
			return InspChar;
		});

	return Promise.all([techObjDetailsPromise, inspCharDetailsPromise]).then(function (data) {
		var techObjDetails = data[0];
		var inspCharDetails = data[1];
		var openCount = 0;
		var finalQuery = "$filter=OrderNumber eq '" + orderNumber + "'";

		techObjDetails.forEach((elementTechObj, index, array) => {
			var openInspChar = inspCharDetails.filter(elementInspChar => elementInspChar.TechnicalObject === elementTechObj.TechnicalObject &&
				elementInspChar.ResultsRecorded === '' && (elementInspChar.InspectionType === elementTechObj.InspectionType || elementTechObj.InspectionType ===
					''));

			var recInspChar = inspCharDetails.filter(elementInspCharRec => elementInspCharRec.TechnicalObject === elementTechObj.TechnicalObject &&
				(elementInspCharRec.ResultsRecorded === 'X'));

			if (openInspChar.length === 0 && recInspChar.length > 0) {
				if (finalQuery.indexOf('TechnicalObject') !== -1) {
					finalQuery = finalQuery + " or TechnicalObject eq '" + elementTechObj.TechnicalObject + "'";
				} else {
					finalQuery = finalQuery + " and (TechnicalObject eq '" + elementTechObj.TechnicalObject + "'";
				}
			}
		});

		if (finalQuery.indexOf('TechnicalObject') !== -1) {
			finalQuery = finalQuery + ") and Status ne 'P'&$orderby=SortNumber, ListCounter";
		} else {
			finalQuery = "$filter=OrderNumber eq 'NOORDER'&$orderby=SortNumber, ListCounter";
		}
		return finalQuery;
	});
}