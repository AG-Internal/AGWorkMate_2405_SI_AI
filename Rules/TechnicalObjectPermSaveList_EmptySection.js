export default function TechnicalObjectPermSaveList_EmptySection(context) {
	var binding = context.binding;
	var orderNumber = binding.OrderId;
	//var closeMessage = clientAPI.evaluateTargetPath('#Page:TechnicalObjectPermSaveList/#Control:FormCellTitle0');
	//var closeButton = pageProxy.evaluateTargetPath('#Page:TechnicalObjectPermSaveList/#Control:CloseButton');
	//closeMessage.setVisible(true);
	//closeButton.setVisible(true);

	var techObjQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "'";
	var techObjPromise = context.read('/SmartInspections/Services/SAM.service', 'TechnicalObjectDetailsSet', [], techObjQueryOptions).then(
		function (results) {
			var techObjDescopeType = [];
			if (results && results.length > 0) {
				results.forEach(function (value) {
					if (value.DescopeType === '') {
						techObjDescopeType.push(value.TechnicalObject);
					}
				});
				return techObjDescopeType;
			}
			return techObjDescopeType;
		});

	return Promise.all([techObjPromise]).then(function (techObjects) {
		var techObjDescopeType = techObjects[0];
		var techObjDescopeTypeCount = techObjects[0].length;
		if (techObjDescopeTypeCount === 0) {
			return 'Close descoped order';
		} else {
			var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "'";
			var inspCharPromise = context.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet', [],
				inspCharQueryOptions).then(
				function (results) {
					var inspCharDescopeType = [];
					if (results && results.length > 0) {
						results.forEach(function (value) {
							if (techObjDescopeType.includes(value.TechnicalObject)) {
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
					return 'Close descoped order';
				} else {
					return 'No Records';
				}
			});
		}
	});
}