export default function SmartInspectionsTabsView_OnPress(clientAPI) {
	var tabPressed = clientAPI.getPageProxy().getPressedItem().getTabItem();
	tabPressed = tabPressed.toString();
	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();

	if (tabPressed.indexOf("TabItem4") !== -1) {
		var orderNumber = clientAPI.getPageProxy().getBindingObject().OrderId;
		var techObjQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "'";
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

		return Promise.all([techObjPromise]).then(function (techObjects) {
			var techObjDescopeType = techObjects[0];
			var techObjDescopeTypeCount = techObjects[0].length;
			if (techObjDescopeTypeCount === 0) {
				clientAPI.getPageProxy().setActionBarItemVisible(0, false);
				clientAPI.getPageProxy().setActionBarItemVisible(1, false);
				clientAPI.getPageProxy().setActionBarItemVisible(2, false);
				clientAPI.getPageProxy().setActionBarItemVisible(3, true);
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
						clientAPI.getPageProxy().setActionBarItemVisible(0, false);
						clientAPI.getPageProxy().setActionBarItemVisible(1, false);
						clientAPI.getPageProxy().setActionBarItemVisible(2, false);
						clientAPI.getPageProxy().setActionBarItemVisible(3, true);
						return true;
					} else {
						clientAPI.getPageProxy().setActionBarItemVisible(0, true);
						clientAPI.getPageProxy().setActionBarItemVisible(1, true);
						clientAPI.getPageProxy().setActionBarItemVisible(2, false);
						clientAPI.getPageProxy().setActionBarItemVisible(3, false);
						return true;
					}
				});
			}
		});
		//clientAPI.getPageProxy().setActionBarItemVisible(0, true);
		//clientAPI.getPageProxy().setActionBarItemVisible(1, true);
		//clientAPI.getPageProxy().setActionBarItemVisible(2, false);
		//clientAPI.getPageProxy().setActionBarItemVisible(3, false);
	} else if (tabPressed.indexOf("TabItem5") !== -1) {
		clientAPI.getPageProxy().setActionBarItemVisible(0, false);
		clientAPI.getPageProxy().setActionBarItemVisible(1, false);
		clientAPI.getPageProxy().setActionBarItemVisible(2, true);
		clientAPI.getPageProxy().setActionBarItemVisible(3, false);
	} else {
		clientAPI.getPageProxy().setActionBarItemVisible(0, false);
		clientAPI.getPageProxy().setActionBarItemVisible(1, false);
		clientAPI.getPageProxy().setActionBarItemVisible(2, false);
		clientAPI.getPageProxy().setActionBarItemVisible(3, false);
	}

}