/* Change Tag : SIV2203, Date:1-Nov-22, Description: EX Group, 
Changes: EX Related Logic
*/
export default function TechnicalObjectDetailsListPage_PendingCount(sectionedTableProxy) {
	var binding = sectionedTableProxy.binding;
	//var orderNumber = binding.OrderNumber;
	var technicalObject = binding.TechnicalObject;
	var descopeType = binding.DescopeType;
	var inspectionType = binding.InspectionType;
	//var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and TechnicalObject eq '" + technicalObject + "'";

	if (descopeType !== '') {
		return "Pending: 0";
	}

	let pageProxy = sectionedTableProxy.getPageProxy();
	let clientData = '';
	var totalPending = 0;

	try {
		clientData = sectionedTableProxy.evaluateTargetPath("#Page:TechnicalObjectDetailsList/#ClientData");
	} catch (err) {}
	var inspCharObjectsArray = clientData.InspCharObjects;
	//	var inspCharObjects = inspCharObjectsArray.filter(element => element.TechnicalObject === technicalObject); //Commented for SIV2203
	/*B.O.A by RB for SIV2203*/
	var inspCharObjects = inspCharObjectsArray.filter(element => element.TechnicalObject === technicalObject && element.DeleteFromWoSnap ===
		false);
	/*E.O.A by RB for SIV2203*/
	for (var i = 0; i < inspCharObjects.length; i++) {
		var value = inspCharObjects[i];
		//if (value.TechnicalObject === technicalObject) {
		if (value.InspectionTypes !== '') {
			var inspectionTypes = value.InspectionTypes.split(",");
			if (value.FixedValuesResult === '' && (inspectionTypes.includes(inspectionType) || inspectionType === '') && value.MicDescopeType ===
				'') {
				totalPending = totalPending + 1;
			}
		} else {
			if (value.FixedValuesResult === '' && inspectionType === '' && value.MicDescopeType === '') {
				totalPending = totalPending + 1;
			}
		}
		//}
	}
	return "Pending: " + totalPending;

	/*return sectionedTableProxy.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet', [], inspCharQueryOptions).then(
		function (results) {
			var totalPending = 0;
			if (results && results.length > 0) {
				results.forEach(function (value) {
					if (value.InspectionTypes !== '') {
						var inspectionTypes = value.InspectionTypes.split(",");
						if (value.FixedValuesResult === '' && (inspectionTypes.includes(inspectionType) || inspectionType === '') && value.MicDescopeType ===
							'') {
							totalPending = totalPending + 1;
						}
					} else {
						if (value.FixedValuesResult === '' && inspectionType === '' && value.MicDescopeType === '') {
							totalPending = totalPending + 1;
						}
					}
				});
				return "Pending: " + totalPending;
			} else {
				return "Pending: " + totalPending;
			}
		});*/
}