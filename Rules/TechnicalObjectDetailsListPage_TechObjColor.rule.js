/* Change Tag : SIV2203, Date:1-Nov-22, Description: EX Group, 
Changes: EX Related Logic
*/
export default function TechnicalObjectDetailsListPage_TechObjColor(sectionedTableProxy) {
	var binding = sectionedTableProxy.binding;
	//var orderNumber = binding.OrderNumber;
	var technicalObject = binding.TechnicalObject;
	//var inspectionSampleNumber = binding.InspectionSampleNumber;
	var inspectionType = binding.InspectionType;
	//var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and TechnicalObject eq '" + technicalObject +
	//	"' and InspectionSampleNumber eq '" + inspectionSampleNumber + "'";

	let pageProxy = sectionedTableProxy.getPageProxy();
	let clientData = '';
	var style = 'textColorNeutral';
	var hasPass = '';
	var hasFix = '';
	var hasFail = '';
	var hasNotRecorded = '';

	try {
		clientData = sectionedTableProxy.evaluateTargetPath("#Page:TechnicalObjectDetailsList/#ClientData");
	} catch (err) {}
	var inspCharObjectsArray = clientData.InspCharObjects;
	// var inspCharObjects = inspCharObjectsArray.filter(element => element.TechnicalObject === technicalObject); //Commented for SIV2203
	/*B.O.A by RB for SIV2203*/
	var inspCharObjects = inspCharObjectsArray.filter(element => element.TechnicalObject === technicalObject && element.DeleteFromWoSnap ===
		false);
	/*E.O.A by RB for SIV2203*/
	for (var i = 0; i < inspCharObjects.length; i++) {
		var value = inspCharObjects[i];
		//if (value.TechnicalObject === technicalObject) {
		if (inspectionType !== '') {
			var inspectionTypes = value.InspectionTypes.split(",");
			if (inspectionTypes.includes(inspectionType)) {
				if (value.FixedValuesResult == 'PASS') {
					hasPass = 'X';
				} else if (value.FixedValuesResult == 'FIX') {
					hasFix = 'X';
				} else if (value.FixedValuesResult == 'FAIL') {
					hasFail = 'X';
				} else if (value.MicDescopeType !== '') {

				} else {
					hasNotRecorded = 'X';
				}
			}
		} else {
			if (value.FixedValuesResult == 'PASS') {
				hasPass = 'X';
			} else if (value.FixedValuesResult == 'FIX') {
				hasFix = 'X';
			} else if (value.FixedValuesResult == 'FAIL') {
				hasFail = 'X';
			} else if (value.MicDescopeType !== '') {

			} else {
				hasNotRecorded = 'X';
			}
		}
		//}
	}

	if (hasNotRecorded === 'X') {
		style = 'textColorNeutral';
	} else if (hasFail === 'X') {
		style = 'textColorFail';
	} else if (hasFix === 'X') {
		style = 'textColorFix';
	} else if (hasPass === 'X') {
		style = 'textColorPass';
	}
	return style;
	/*return sectionedTableProxy.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet', [], inspCharQueryOptions).then(
		function (results) {
			var style = 'textColorNeutral';
			var hasPass = '';
			var hasFix = '';
			var hasFail = '';
			var hasNotRecorded = '';
			//alert(results.length);
			if (results && results.length > 0) {
				results.forEach(function (value) {
					if (inspectionType !== '') {
						var inspectionTypes = value.InspectionTypes.split(",");
						if (inspectionTypes.includes(inspectionType)) {
							if (value.FixedValuesResult == 'PASS') {
								hasPass = 'X';
							} else if (value.FixedValuesResult == 'FIX') {
								hasFix = 'X';
							} else if (value.FixedValuesResult == 'FAIL') {
								hasFail = 'X';
							} else if (value.MicDescopeType !== '') {

							} else {
								hasNotRecorded = 'X';
							}
						}
					} else {
						if (value.FixedValuesResult == 'PASS') {
							hasPass = 'X';
						} else if (value.FixedValuesResult == 'FIX') {
							hasFix = 'X';
						} else if (value.FixedValuesResult == 'FAIL') {
							hasFail = 'X';
						} else if (value.MicDescopeType !== '') {

						} else {
							hasNotRecorded = 'X';
						}
					}
				});
				//alert(hasNotRecorded + " " + hasFail + " " + hasFix + " " + hasPass);
				if (hasNotRecorded === 'X') {
					style = 'textColorNeutral';
				} else if (hasFail === 'X') {
					style = 'textColorFail';
				} else if (hasFix === 'X') {
					style = 'textColorFix';
				} else if (hasPass === 'X') {
					style = 'textColorPass';
				}
				return style;
			} else {
				return style;
			}
		});*/
}