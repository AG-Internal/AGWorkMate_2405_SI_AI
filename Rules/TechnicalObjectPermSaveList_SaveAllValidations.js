function ExecuteUpdateEntity(pageProxy, binding) {
	pageProxy.setActionBinding(binding);
	//Must return the promised returned by executeAction to keep the chain alive.
	return pageProxy.executeAction('/SmartInspections/Actions/TechnicalObjectSave_UpdateEntity.action');
}

function Wait() {
	return new Promise(r => setTimeout(r, 100))
}

export default function TechnicalObjectPermSaveList_SaveAllValidations(clientAPI) {
	let pageProxy = clientAPI.getPageProxy();
	let myListPageClientData = '';
	//var latestPromise = Promise.resolve();

	try {
		myListPageClientData = clientAPI.evaluateTargetPath("#Page:TechnicalObjectPermSaveList/#ClientData");
	} catch (err) { }

	if ((myListPageClientData.SelectedBindingObjects === undefined || myListPageClientData.SelectedBindingObjects.length === 0) && (
		myListPageClientData.UnselectedBindingObjects === undefined || myListPageClientData.UnselectedBindingObjects.length === 0)) {
		return pageProxy.executeAction('/SmartInspections/Actions/NoChangesToSave_Message.action');
	} else {

		pageProxy.executeAction('/SmartInspections/Actions/Save_InProgressMessage.action');

		var latestPromise = Promise.resolve();

		var allObjects = (myListPageClientData.SelectedBindingObjects).concat(myListPageClientData.UnselectedBindingObjects);
		var bSaveDone = false;//++D048
		for (var i = 0; i < allObjects.length; i++) {
			let binding = allObjects[i];
			if (binding.Status !== 'P') {
				bSaveDone = true;//++D048
				latestPromise = latestPromise.then(() => {
					binding.Status = 'P';
					return ExecuteUpdateEntity(pageProxy, binding);
				}).then(Wait);
			}
		}
		//B.O.A for D048
		if (bSaveDone) {
			if (clientAPI.evaluateTargetPathForAPI('#Page:TechnicalObjectPermSaveList')) {
				clientAPI.evaluateTargetPathForAPI('#Page:TechnicalObjectPermSaveList').getControl('SectionedTable0').redraw();
			}
		}
		//E.O.A for D048

		return latestPromise.then(function () {
			//B.O.A for D048
			if (bSaveDone) {
				return pageProxy.executeAction('/SmartInspections/Actions/TechObjsSubmitSuccess.action');
			}
			//E.O.A for D048
			return pageProxy.executeAction('/SmartInspections/Actions/Save_SuccessMessage.action');
		}.bind(pageProxy));
	}
}