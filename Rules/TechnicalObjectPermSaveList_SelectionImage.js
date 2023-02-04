export default function TechnicalObjectPermSaveList_SelectionImage(sectionedTableProxy) {
	var binding = sectionedTableProxy.binding;
	var selectedToSave = binding.SelectedToSave;
	var saveMode = binding.SaveMode;
	var saveStatus = binding.Status;
	let pageProxy = sectionedTableProxy.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	var selectedItemId = binding["@odata.id"];

	if (pageClientData.SelectedItems == undefined) {
		pageClientData.SelectedItems = [];
	}

	if (pageClientData.SelectedBindingObjects == undefined) {
		pageClientData.SelectedBindingObjects = [];
	}

	if (pageClientData.UnselectedItems == undefined) {
		pageClientData.UnselectedItems = [];
	}

	if (pageClientData.UnselectedBindingObjects == undefined) {
		pageClientData.UnselectedBindingObjects = [];
	}

	var index = (pageClientData.SelectedItems).indexOf(selectedItemId);
	var indexUnsel = (pageClientData.UnselectedItems).indexOf(selectedItemId);

	if (saveStatus === 'P') { // (saveMode === 'SAVE' || saveStatus === 'P') {
		if (index > -1) {
			(pageClientData.SelectedItems).splice(index, 1);
			(pageClientData.SelectedBindingObjects).splice(index, 1);
		}
		if (indexUnsel > -1) {
			(pageClientData.UnselectedItems).splice(indexUnsel, 1);
			(pageClientData.UnselectedBindingObjects).splice(indexUnsel, 1);
		}
		return 'sap-icon://complete';
	} else if (selectedToSave === 'X') {
		if (index > -1) {
			(pageClientData.SelectedItems).splice(index, 1);
			(pageClientData.SelectedBindingObjects).splice(index, 1);
		}
		if (indexUnsel > -1) {
			(pageClientData.UnselectedItems).splice(indexUnsel, 1);
			(pageClientData.UnselectedBindingObjects).splice(indexUnsel, 1);
		}
		(pageClientData.SelectedItems).push(selectedItemId);
		(pageClientData.SelectedBindingObjects).push(binding);
		return 'sap-icon://complete';
	} else {
		if (index > -1) {
			(pageClientData.SelectedItems).splice(index, 1);
			(pageClientData.SelectedBindingObjects).splice(index, 1);
		}
		if (indexUnsel > -1) {
			(pageClientData.UnselectedItems).splice(indexUnsel, 1);
			(pageClientData.UnselectedBindingObjects).splice(indexUnsel, 1);
		}
		(pageClientData.UnselectedItems).push(selectedItemId);
		(pageClientData.UnselectedBindingObjects).push(binding);
		return 'sap-icon://border';
	}
}