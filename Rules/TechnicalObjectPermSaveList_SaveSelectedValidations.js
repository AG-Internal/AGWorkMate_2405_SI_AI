function ExecuteUpdateEntity(pageProxy, binding) {
	pageProxy.setActionBinding(binding);
	//Must return the promised returned by executeAction to keep the chain alive.
	return pageProxy.executeAction('/SmartInspections/Actions/TechnicalObjectSave_UpdateEntity.action');
}

function Wait() {
	return new Promise(r => setTimeout(r, 2000))
}

export default function TechnicalObjectPermSaveList_SaveSelectedValidations(clientAPI) {
	let pageProxy = clientAPI.getPageProxy();
	let myListPageClientData = '';

	try {
		myListPageClientData = clientAPI.evaluateTargetPath("#Page:TechnicalObjectPermSaveList/#ClientData");
	} catch (err) {}

	if (myListPageClientData.SelectedBindingObjects === undefined || myListPageClientData.SelectedBindingObjects.length === 0) {
		return pageProxy.executeAction('/SmartInspections/Actions/NoChangesToSave_Message.action');
	} else {

		/*if (myListPageClientData.SelectedBindingObjects.length > 0) {
			pageProxy.executeAction('/SmartInspections/Actions/TechnicalObjectPermSaveListSaveSelected_ConfirmMessage.action');
		}*/

		pageProxy.executeAction('/SmartInspections/Actions/Save_InProgressMessage.action');

		var latestPromise = Promise.resolve();

		for (var i = 0; i < myListPageClientData.SelectedBindingObjects.length; i++) {
			let binding = myListPageClientData.SelectedBindingObjects[i];
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