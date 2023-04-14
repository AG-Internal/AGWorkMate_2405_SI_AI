function ExecuteUpdateEntity(clientAPI, binding) {
	clientAPI.getPageProxy().setActionBinding(binding);
	return clientAPI.executeAction('/SmartInspections/Actions/TechnicalObjectDescopeTypeSave_UpdateEntity.action');
}

function Wait() {
	return new Promise(r => setTimeout(r, 2000))
}

export default function DescopeTypeClearButton_OnPress(clientAPI) {
	var binding = clientAPI.getPageProxy().getActionBinding();
	var descopeType = '';
	var descopeTypeDesc = '';
	let listPageClientData = '';
	var latestPromise = Promise.resolve();

	try {
		listPageClientData = clientAPI.evaluateTargetPath("#Page:TechnicalObjectDetailsList/#ClientData");
		var binding = listPageClientData.NavigatedTechObject;
	} catch (err) {}

	var isoDateTime = new Date().toISOString();
	var dateTime = isoDateTime.split(".");
	var time = dateTime[0].split("T");

	latestPromise = latestPromise.then(() => {
		binding.DescopeType = descopeType;
		binding.DescopeTypeDesc = descopeTypeDesc;
		binding.DescopedOn = new Date().toISOString();
		binding.DescopedTime = time[1];
		binding.Status = 'T';
		return ExecuteUpdateEntity(clientAPI, binding);
	}).then(Wait);

	return latestPromise.then(function () {
		//return true;
		return clientAPI.executeAction("/SmartInspections/Actions/BringBackToScope_Done.action");
	});
}