function ExecuteUpdateEntity(pageProxy, binding) {
	pageProxy.setActionBinding(binding);
	//Must return the promised returned by executeAction to keep the chain alive.
	return pageProxy.executeAction('/SmartInspections/Actions/TechnicalObjectSave_UpdateEntity.action');
}

function Wait() {
	return new Promise(r => setTimeout(r, 2000))
}

export default function TechnicalObjectPermSaveList_SaveAllValidations(clientAPI) {
	let pageProxy = clientAPI.getPageProxy();
	let myListPageClientData = '';
	//var latestPromise = Promise.resolve();

	try {
		myListPageClientData = clientAPI.evaluateTargetPath("#Page:TechnicalObjectPermSaveList/#ClientData");
	} catch (err) {}

	if ((myListPageClientData.SelectedBindingObjects === undefined || myListPageClientData.SelectedBindingObjects.length === 0) && (
			myListPageClientData.UnselectedBindingObjects === undefined || myListPageClientData.UnselectedBindingObjects.length === 0)) {
		return pageProxy.executeAction('/SmartInspections/Actions/NoChangesToSave_Message.action');
	} else {

		pageProxy.executeAction('/SmartInspections/Actions/Save_InProgressMessage.action');

		var latestPromise = Promise.resolve();

		var allObjects = (myListPageClientData.SelectedBindingObjects).concat(myListPageClientData.UnselectedBindingObjects);

		for (var i = 0; i < allObjects.length; i++) {
			let binding = allObjects[i];
			if (binding.Status !== 'P') {
				latestPromise = latestPromise.then(() => {
					binding.Status = 'P';
					return ExecuteUpdateEntity(pageProxy, binding);
				}).then(Wait);
			}
		}

		return latestPromise.then(function () {
			return pageProxy.executeAction('/SmartInspections/Actions/Save_SuccessMessage.action');
		}.bind(pageProxy));
	}
}