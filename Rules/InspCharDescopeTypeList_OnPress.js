import libVal from './Common/ValidationLibrary';

function ExecuteUpdateEntity(clientAPI, binding) {
	clientAPI.getPageProxy().setActionBinding(binding);
	return clientAPI.executeAction('/SmartInspections/Actions/InspCharDescopeTypeSave_UpdateEntity.action');
}

function Wait() {
	return new Promise(r => setTimeout(r, 2000))
}

export default function InspCharDescopeTypeList_OnPress(clientAPI) {
	var binding = clientAPI.getPageProxy().getActionBinding();
	var descopeType = binding.DescopeType;
	var descopeTypeDesc = binding.DescopeTypeDesc;
	let InspCharClientData = '';
	let currentPage = clientAPI.getPageProxy().currentPage;
	let currentPageString = currentPage.toString()
	var latestPromise = Promise.resolve();

	//if (currentPageString.indexOf("QualitativeDate") !== -1) {
	try {
		InspCharClientData = clientAPI.evaluateTargetPath("#Page:QualitativeDate/#ClientData");
		var binding = InspCharClientData.InspCharBindingData;
	} catch (err) {}
	//} else if (currentPageString.indexOf("QualitativePFF") !== -1) {
	try {
		InspCharClientData = clientAPI.evaluateTargetPath("#Page:QualitativePFF/#ClientData");
		var binding = InspCharClientData.InspCharBindingData;
	} catch (err) {}
	//} else if (currentPageString.indexOf("QualitativeYN") !== -1) {
	try {
		InspCharClientData = clientAPI.evaluateTargetPath("#Page:QualitativeYN/#ClientData");
		var binding = InspCharClientData.InspCharBindingData;
	} catch (err) {}
	//} else if (currentPageString.indexOf("Quantitative") !== -1) {
	try {
		InspCharClientData = clientAPI.evaluateTargetPath("#Page:Quantitative/#ClientData");
		var binding = InspCharClientData.InspCharBindingData;
	} catch (err) {}
	//} else if (currentPageString.indexOf("QuantitativeMultiple") !== -1) {
	try {
		InspCharClientData = clientAPI.evaluateTargetPath("#Page:QuantitativeMultiple/#ClientData");
		var binding = InspCharClientData.InspCharBindingData;
	} catch (err) {}
	//}
	
	var isoDateTime = new Date().toISOString();
	var dateTime = isoDateTime.split(".");
	var time = dateTime[0].split("T");

	latestPromise = latestPromise.then(() => {
		binding.MicDescopeType = descopeType;
		binding.MicDescopeDesc = descopeTypeDesc;
		binding.DescopedOn = new Date().toISOString();
		binding.DescopedTime = time[1];
		binding.IsDescopeUpdated = true;
		return ExecuteUpdateEntity(clientAPI, binding);
	}).then(Wait);

	return latestPromise.then(function () {
		/*var actionPromise = clientAPI.executeAction('/SmartInspections/Actions/InspCharDescopeTypeDetailsList_Close.action');
		return latestPromise.then(function () {
			if (libVal.evalIsEmpty(binding.FunctionalLocation)) {
				var techObject = binding.TechnicalObject;
				var desc = binding.EquipmentDescription;
				var techObjectDesc = techObject + " - " + desc;
				var techObjectDesc = techObject + " - " + desc + " (" + binding.MicDescopeDesc + ")";
			} else {
				var techObject = binding.TechnicalObject;
				var desc = binding.FunctionalLocationDesc;
				var techObjectDesc = techObject + " - " + desc;
				var techObjectDesc = techObject + " - " + desc + " (" + binding.MicDescopeDesc + ")";
			}
			clientAPI.getPageProxy().setCaption(techObjectDesc);*/
		return clientAPI.executeAction('/SmartInspections/Actions/InspCharDescopeTypeDetailsList_Close.action');
		//});
	});
}