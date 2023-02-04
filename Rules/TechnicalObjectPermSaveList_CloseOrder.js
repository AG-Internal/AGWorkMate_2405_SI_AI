function ExecuteUpdateEntity(pageProxy, binding) {
	pageProxy.setActionBinding(binding);
	//Must return the promised returned by executeAction to keep the chain alive.
	return pageProxy.executeAction('/SmartInspections/Actions/WorkOrderSave_UpdateEntity.action');
}

function Wait() {
	return new Promise(r => setTimeout(r, 2000))
}

export default function TechnicalObjectPermSaveList_CloseOrder(clientAPI) {
	let pageProxy = clientAPI.getPageProxy();
	var orderNumber = clientAPI.getPageProxy().getBindingObject().OrderId;
	var workOrderQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "'";
	var techObjPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet', [], workOrderQueryOptions).then(
		function (results) {
			var binding = {};
			if (results && results.length > 0) {
				results.forEach(function (value) {
					binding = value;
				});
			}
			return binding;
		});

	return Promise.all([techObjPromise]).then(function (object) {
		var latestPromise = Promise.resolve();
		var binding = object[0];
		if (binding.CloseOrder === 'X') {
			return pageProxy.executeAction('/SmartInspections/Actions/WorkOrderAlreadyClosed_ErrorMessage.action');
		} else {
			latestPromise = latestPromise.then(() => {
				binding.CloseOrder = 'X';
				return ExecuteUpdateEntity(pageProxy, binding);
			}).then(Wait);

			return latestPromise.then(function () {
				return pageProxy.executeAction('/SmartInspections/Actions/Save_SuccessMessage.action');
			}.bind(pageProxy));
		}
	});
}