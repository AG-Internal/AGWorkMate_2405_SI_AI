import libVal from './Common/ValidationLibrary';
import onLoaded from './ResultRecording_OnLoaded';

function ExecuteUpdateEntity(clientAPI, binding) {
	clientAPI.getPageProxy().setActionBinding(binding);
	return clientAPI.executeAction('/SmartInspections/Actions/InspCharDescopeTypeSave_UpdateEntity.action');
}

function Wait() {
	return new Promise(r => setTimeout(r, 2000))
}

export default function InspCharDescopeTypeClearButton_OnPress(clientAPI) {
	var binding = clientAPI.getPageProxy().getActionBinding();
	var descopeType = '';
	var descopeTypeDesc = '';
	let InspCharClientData = '';
	let currentPage = clientAPI.getPageProxy().currentPage;
	let currentPageString = currentPage.toString()
	var latestPromise = Promise.resolve();

	if (currentPageString.indexOf("QualitativeDate") !== -1) {
		try {
			InspCharClientData = clientAPI.evaluateTargetPath("#Page:QualitativeDate/#ClientData");
			var binding = InspCharClientData.InspCharBindingData;
		} catch (err) {}
	} else if (currentPageString.indexOf("QualitativePFF") !== -1) {
		try {
			InspCharClientData = clientAPI.evaluateTargetPath("#Page:QualitativePFF/#ClientData");
			var binding = InspCharClientData.InspCharBindingData;
		} catch (err) {}
	} else if (currentPageString.indexOf("QualitativeYN") !== -1) {
		try {
			InspCharClientData = clientAPI.evaluateTargetPath("#Page:QualitativeYN/#ClientData");
			var binding = InspCharClientData.InspCharBindingData;
		} catch (err) {}
	} else if (currentPageString.indexOf("QuantitativeMultiple") !== -1) {
		try {
			InspCharClientData = clientAPI.evaluateTargetPath("#Page:QuantitativeMultiple/#ClientData");
			var binding = InspCharClientData.InspCharBindingData;
		} catch (err) {}
	} else if (currentPageString.indexOf("Quantitative") !== -1) {
		try {
			InspCharClientData = clientAPI.evaluateTargetPath("#Page:Quantitative/#ClientData");
			var binding = InspCharClientData.InspCharBindingData;
		} catch (err) {}
	}

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
		/*if (libVal.evalIsEmpty(binding.FunctionalLocation)) {
			var techObject = binding.TechnicalObject;
			var desc = binding.EquipmentDescription;
			var techObjectDesc = techObject + " - " + desc;
		} else {
			var techObject = binding.TechnicalObject;
			var desc = binding.FunctionalLocationDesc;
			var techObjectDesc = techObject + " - " + desc;
		}*/
		//clientAPI.getPageProxy().setCaption(techObjectDesc);

		if (currentPageString.indexOf("QualitativeDate") !== -1) {
			onLoaded.QualitativeDatePage_OnLoaded(clientAPI);
		} else if (currentPageString.indexOf("QualitativePFF") !== -1) {
			onLoaded.QualitativePFFPage_OnLoaded(clientAPI);
		} else if (currentPageString.indexOf("QualitativeYN") !== -1) {
			onLoaded.QualitativeYNPage_OnLoaded(clientAPI);
		} else if (currentPageString.indexOf("QuantitativeMultiple") !== -1) {
			onLoaded.QuantitativeMultiplePage_OnLoaded(clientAPI);
		} else if (currentPageString.indexOf("Quantitative") !== -1) {
			onLoaded.QuantitativePage_OnLoaded(clientAPI);
		}

		return true;
	});
}