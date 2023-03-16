export default function PassAllButton_SetEnabled(clientAPI) {
	var binding = clientAPI.getPageProxy().binding;
	var orderNumber = binding.OrderNumber;
	var technicalObject = binding.TechnicalObject;
	var descopeType = binding.DescopeType;
	var techStatus = binding.Status;
	var inspectionType = binding.InspectionType; //++T014
	//B.O.comment for T014
	/*	var workOrderQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "'";
		return clientAPI.read('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet', [], workOrderQueryOptions).then(
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
			}); */
	//E.O.comment for T014
	//B.O.A for T014

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
				return totalPending;
			} else {
				return totalPending;
			}
		});

	// check Both & Decide
	return Promise.all([oWOPromise, oInspPromise]).then(function (pValues) {
		let workOrderStatus = pValues[0];
		let pendCount = pValues[1];

		if (!workOrderStatus || pendCount === 0) {
			//Work order closed or No pending MIC  - Disable
			return false;
		}
		return true;
	});
	//E.O.A for T014

}