/* Change Tag : SIV2203, Date:1-Nov-22, Description: EX Group, 
Changes: EX Related Logic
*/
export default function SmartInspection_TechnicalObjectCount_His(clientAPI) {
	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	var orderNumber = clientAPI.getPageProxy().getBindingObject().OrderId;
	var techObjQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and Status eq 'P'";
	//	var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "'";//Commented for SIV2203
	/*B.O.A by RB for SIV2203*/
	var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "'" + " and DeleteFromWoSnap eq false";
	/*E.O.A by RB for SIV2203*/
	var techObjDetailsPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'TechnicalObjectDetailsSet', [],
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

	var inspCharDetailsPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet', [],
		inspCharQueryOptions).then(
			function (results) {
				var InspChar = [];
				var InspCharFull = [];
				if (results && results.length > 0) {
					results.forEach(function (value) {
						if (value.FixedValuesResult !== '') {
							var inspTypes = value.InspectionTypes;
							var techObject = value.TechnicalObject;
							var inspTypesArray = inspTypes.split(",");
							for (var i = 0; i < inspTypesArray.length; i++) {
								var inspectionTypes = {
									TechnicalObject: techObject,
									InspectionType: inspTypesArray[i]
								};
								InspChar.push(inspectionTypes);
							}
							var inspectionTypesFull = {
								TechnicalObject: techObject,
								InspectionType: inspTypes
							};
							InspCharFull.push(inspectionTypesFull);
						}
					});
					pageClientData.AdHocNodeNumber = InspCharFull;
					return InspChar;
				}
				pageClientData.AdHocNodeNumber = InspCharFull;
				return InspChar;
			});

	return Promise.all([techObjDetailsPromise, inspCharDetailsPromise]).then(function (data) {
		var techObjDetails = data[0];
		var inspCharDetails = data[1];
		var openCount = 0;

		techObjDetails.forEach((elementTechObj, index, array) => {
			if (elementTechObj.InspectionType === '') {
				var openInspChar = pageClientData.AdHocNodeNumber.filter(elementInspChar => elementInspChar.TechnicalObject === elementTechObj.TechnicalObject);
			} else {
				var openInspChar = inspCharDetails.filter(elementInspChar => elementInspChar.TechnicalObject === elementTechObj.TechnicalObject &&
					(elementInspChar.InspectionType === elementTechObj.InspectionType));
			}
			openCount = openCount + openInspChar.length;
		});
		return openCount;
	});
}