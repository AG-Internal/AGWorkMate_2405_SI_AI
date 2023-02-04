export default function TechnicalObjectPermSaveList_AddRemoveSelection(clientAPI) {
	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	var pressedItemId = clientAPI.getPageProxy().getActionBinding()["@odata.id"];
	var binding = clientAPI.getPageProxy().getActionBinding();
	var saveMode = binding.SaveMode;
	var saveStatus = binding.Status;

	pageClientData.UpdateMode = "Selection";
	clientAPI.getPageProxy().setActionBarItemVisible(0, true);
	clientAPI.getPageProxy().setActionBarItemVisible(1, true);

	if (saveStatus == 'P') {
		return clientAPI.executeAction('/SmartInspections/Actions/TechnicalObjectPermSaveListAlreadySaved_ErrorMessage.action');
	}

	if (pageClientData.SelectedItems == undefined) {
		pageClientData.SelectedItems = [];
	}

	if (pageClientData.SelectedBindingObjects == undefined) {
		pageClientData.SelectedBindingObjects = [];
	}

	var index = (pageClientData.SelectedItems).indexOf(pressedItemId);
	var indexUnsel = (pageClientData.UnselectedItems).indexOf(pressedItemId);

	if (index > -1) {
		binding.SelectedToSave = '';
		(pageClientData.SelectedItems).splice(index, 1);
		(pageClientData.SelectedBindingObjects).splice(index, 1);
		(pageClientData.UnselectedItems).push(pressedItemId);
		(pageClientData.UnselectedBindingObjects).push(binding);
	} else {
		binding.SelectedToSave = 'X';
		(pageClientData.SelectedItems).push(pressedItemId);
		(pageClientData.SelectedBindingObjects).push(binding);
		(pageClientData.UnselectedItems).splice(indexUnsel, 1);
		(pageClientData.UnselectedBindingObjects).splice(indexUnsel, 1);
	}

	clientAPI.getPageProxy().setActionBinding(binding);
	return clientAPI.executeAction('/SmartInspections/Actions/TechnicalObjectSave_UpdateEntity.action');
}