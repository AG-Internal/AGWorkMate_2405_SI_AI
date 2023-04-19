export default function ClearAllButton_SetEnabled(clientAPI) {
	var binding = clientAPI.getPageProxy().binding;
	var orderNumber = binding.OrderNumber;
	var technicalObject = binding.TechnicalObject;
	var descopeType = binding.DescopeType;
	var techStatus = binding.Status;
	var inspectionType = binding.InspectionType;

	if (descopeType !== '' || techStatus === 'P') {
		//if Descoped or Perm saved
		return false;
	}

	//Read Work order
	var workOrderQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "'";
	var oWOPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet', [], workOrderQueryOptions).then(
		function (results) {
			var status = true;
			if (results && results.length > 0) {
				results.forEach(function (value) {
					if (value.CloseOrder === 'X' || techStatus === 'P' || descopeType !== '') {
						status = false;
					} else {
						status = true;
					}
				});
				return status;
			}
			return status;
		});

	//Read Insp Res Rec
	var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and TechnicalObject eq '" + technicalObject + "'" +
		" and DeleteFromWoSnap eq false";

	var oInspPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet', [], inspCharQueryOptions).then(
		function (results) {
			var bHasResult = false;
			/* Return true if it has any results Recorded */
			if (results && results.length > 0) {
				results.forEach(function (value) {
					if (value.FixedValuesResult !== '' || value.MicDescopeType !== '' || value.Result !== '') {
						bHasResult = true; // Has Result
					}
				});
			}
			return bHasResult;
		});

	// check Both & Decide
	return Promise.all([oWOPromise, oInspPromise]).then(function (pValues) {
		let workOrderStatus = pValues[0];
		let bHasResult = pValues[1];

		if (!workOrderStatus) {
			//Work order closed  Disable
			return false;
		}
		//If has Result - Enable ; No result - Disable
		return bHasResult;
	});

}