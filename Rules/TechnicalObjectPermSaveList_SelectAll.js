function ExecuteUpdateEntity(pageProxy, binding) {
	pageProxy.setActionBinding(binding);
	//Must return the promised returned by executeAction to keep the chain alive.
	return pageProxy.executeAction('/SmartInspections/Actions/TechnicalObjectSave_UpdateEntity.action');
}

function Wait() {
	return new Promise(r => setTimeout(r, 2000))
}

export default function TechnicalObjectPermSaveList_SelectAll(clientAPI) {
	let pageProxy = clientAPI.getPageProxy();
	let myListPageClientData = '';
	var latestPromise = Promise.resolve();

	try {
		myListPageClientData = clientAPI.evaluateTargetPath("#Page:TechnicalObjectPermSaveList/#ClientData");
	} catch (err) {}

	if (myListPageClientData.UnselectedBindingObjects === undefined || myListPageClientData.UnselectedBindingObjects.length === 0) {

	} else {
		for (var i = 0; i < myListPageClientData.UnselectedBindingObjects.length; i++) {
			let binding = myListPageClientData.UnselectedBindingObjects[i];
			if (binding.SaveMode !== 'Save') {
				latestPromise = latestPromise.then(() => {
					binding.SelectedToSave = 'X';
					return ExecuteUpdateEntity(pageProxy, binding);
				}).then(Wait);
			}
		}

		return latestPromise.then(function () {

		}.bind(pageProxy));
	}
}