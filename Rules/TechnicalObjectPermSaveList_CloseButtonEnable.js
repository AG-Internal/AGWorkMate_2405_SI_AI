/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function TechnicalObjectPermSaveList_CloseButtonEnable(clientAPI) {
	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	var orderNumber = clientAPI.getPageProxy().getBindingObject().OrderId;
	var techObjQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "'";
	//Tech Objects
	var techObjPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'TechnicalObjectDetailsSet', [], techObjQueryOptions).then(
		function (results) {
			var techObjDescopeType = [];
			var permSavedTechObj = [];
			if (results && results.length > 0) {
				results.forEach(function (value) {
					if (value.DescopeType === '' && value.Status !== 'P') {
						techObjDescopeType.push(value.TechnicalObject);
					}
					if (value.Status === 'P') {
						permSavedTechObj.push(value.TechnicalObject);
					}
				});
				pageClientData.permSavedTechObj = permSavedTechObj;
				return techObjDescopeType;
			}
			pageClientData.permSavedTechObj = permSavedTechObj;
			return techObjDescopeType;
		});
	//Work order Header
	var workOrderQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "'";
	var woClosePromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet', [], workOrderQueryOptions).then(
		function (results) {
			var binding = {};
			if (results && results.length > 0) {
				results.forEach(function (value) {
					binding = value;
				});
			}
			return binding;
		});


	return Promise.all([techObjPromise, woClosePromise]).then(function (techObjects) {
		var techObjDescopeType = techObjects[0];
		var techObjDescopeTypeCount = techObjects[0].length;
		var woHeader = techObjects[1];
		if (woHeader.CloseOrder === 'X') {
			return false;//already closed
		}
		if (techObjDescopeTypeCount === 0) {
			return true;
		} else {
			var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "'";
			var inspCharPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet', [],
				inspCharQueryOptions).then(
					function (results) {
						var inspCharDescopeType = [];
						if (results && results.length > 0) {
							results.forEach(function (value) {
								if (techObjDescopeType.includes(value.TechnicalObject) && !(pageClientData.permSavedTechObj.includes(value.TechnicalObject))) {
									if (value.MicDescopeType === '') {
										inspCharDescopeType.push(value.TechnicalObject);
									}
								}
							});
							return inspCharDescopeType;
						}
						return inspCharDescopeType;
					});

			return Promise.all([inspCharPromise]).then(function (inspObjects) {
				var inspCharDescopeType = inspObjects[0];
				var inspCharDescopeTypeCount = inspObjects[0].length;

				if (inspCharDescopeTypeCount === 0) {
					return true;
				} else {
					return false;
				}
			});
		}
	});
}
