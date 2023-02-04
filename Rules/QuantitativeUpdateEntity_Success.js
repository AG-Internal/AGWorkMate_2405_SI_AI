export default function QuantitativeUpdateEntity_Success(clientAPI) {

	let clientData = undefined;
	let clientDataErrorArchive = undefined;
	let lastPressed = '';
	let lastPressedErrorArchive = '';

	try {
		clientData = clientAPI.evaluateTargetPath("#Page:Quantitative/#ClientData");
	} catch (err) {}

	try {
		clientDataErrorArchive = clientAPI.evaluateTargetPath("#Page:SmartInspectionsErrorArchiveDetails/#ClientData");
	} catch (err) {}

	if (clientData) {
		lastPressed = clientData.LastPressed;
	}

	if (clientDataErrorArchive) {
		lastPressedErrorArchive = clientDataErrorArchive.LastPressed;
	}

	if (lastPressed.indexOf("MDKActionItem") !== -1) {
		return clientAPI.executeAction("/SmartInspections/Actions/QuantitativePage_MorePopover.action");
	} else if (lastPressed.indexOf("NavigationButton") !== -1) {
		return clientAPI.executeAction("/SmartInspections/Actions/QuantitativeClose_Complete.action");
	} else if (lastPressed.indexOf("ToolBarItem") !== -1) {
		return '';
	} else if (lastPressedErrorArchive.indexOf("ErrorFix") !== -1) {
		return clientAPI.executeAction("/SmartInspections/Actions/ErrorFixSave_SuccessMessage.action");
	}
}