/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function TechnicalObjectDetailsListPage_TechObjLineColor(clientAPI) {
    var binding = clientAPI.binding;
	var technicalObject = binding.TechnicalObject;
	var inspectionType = binding.InspectionType;
	

	let pageProxy = clientAPI.getPageProxy();
	let clientData = '';
	var style = 'textColorNeutral';
	var hasPass = '';
	var hasFix = '';
	var hasFail = '';
	var hasNotRecorded = '';

	try {
		clientData = clientAPI.evaluateTargetPath("#Page:TechnicalObjectDetailsList/#ClientData");
	} catch (err) {}
	var inspCharObjectsArray = clientData.InspCharObjects;

	var inspCharObjects = inspCharObjectsArray.filter(element => element.TechnicalObject === technicalObject && element.DeleteFromWoSnap ===
		false);
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
		style = 'micColorNeutral';
	} else if (hasFail === 'X') {
		style = 'micLineColorFail';
	} else if (hasFix === 'X') {
		style = 'micLineColorFix';
	} else if (hasPass === 'X') {
		style = 'micLineColorPass';
	}
	return style;

}
