export default function InspectionCharacteristicDetails_Prev(clientAPI) {
	let pageProxy = clientAPI.getPageProxy();
	var binding = pageProxy.getBindingObject();
	var indexValue = binding.Index;
	var maxIndex = binding.MaxIndex;
	var micType = binding.MicType;
	let myListPageClientData = '';

	try {
		myListPageClientData = clientAPI.evaluateTargetPath("#Page:SmartInspectionsTabsView/#ClientData");
	} catch (err) {}

	var totalCount = Number(maxIndex);
	var index = Number(indexValue);

	if (index === 1) {
		index = totalCount;
	} else {
		index = index - 1;
	}

	/*if (micType === '01') {
		clientAPI.executeAction('/SAPAssetManager/Actions/SmartInspection/QuantitativeClose_Complete.action');
	} else if (micType === '02') {
		clientAPI.executeAction('/SAPAssetManager/Actions/SmartInspection/QualitativeYNClose_Complete.action');
	} else if (micType === '03') {
		clientAPI.executeAction('/SAPAssetManager/Actions/SmartInspection/QualitativePFFClose_Complete.action');
	} else if (micType === '04') {
		clientAPI.executeAction('/SAPAssetManager/Actions/SmartInspection/QuantitativeMultipleClose_Complete.action');
	} else if (micType === '05') {
		clientAPI.executeAction('/SAPAssetManager/Actions/SmartInspection/QualitativeDateClose_Complete.action');
	}*/

	if (myListPageClientData.InspCharList === undefined || myListPageClientData.InspCharList.length === 0) {
		return;
	} else {
		var nextBinding = myListPageClientData.InspCharList[index - 1];
		var nextMicType = nextBinding.MicType;
	}

	//clientAPI.getPageProxy().redraw();
	pageProxy.setActionBinding(nextBinding);
	//clientAPI.getPageProxy().redraw();
	//clientAPI.getPageProxy().redraw();

	if (micType === nextMicType) {
		clientAPI.getPageProxy().redraw();
		return;
	}

	if (nextMicType === '01') {
		return clientAPI.executeAction('/SmartInspections/Actions/NavToQuantitative.action');
	} else if (nextMicType === '02') {
		return clientAPI.executeAction('/SmartInspections/Actions/NavToQualitativeYN.action');
	} else if (nextMicType === '03') {
		return clientAPI.executeAction('/SmartInspections/Actions/NavToQualitativePFF.action');
	} else if (nextMicType === '04') {
		return clientAPI.executeAction('/SmartInspections/Actions/NavToQuantitativeMultiple.action');
	} else if (nextMicType === '05') {
		return clientAPI.executeAction('/SmartInspections/Actions/NavToQualitativeDate.action');
	}
}