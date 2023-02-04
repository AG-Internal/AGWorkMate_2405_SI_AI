export default function ResultsRecordingAfterSave_Success(clientAPI) {
	let clientData = undefined;
	let clientDataErrorArchive = undefined;
	let lastPressed = '';
	let lastPressedErrorArchive = '';

	try {
		clientData = clientAPI.evaluateTargetPath("#Page:QualitativeDate/#ClientData");
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
		return clientAPI.executeAction("/SmartInspections/Actions/QualitativeDatePage_MorePopover.action");
	} else if (lastPressed.indexOf("NavigationButton") !== -1) {
		return clientAPI.executeAction("/SmartInspections/Actions/QualitativeDateClose_Complete.action");
	} else if (lastPressed.indexOf("ToolBarItem") !== -1) {
		return '';
	} else if (lastPressedErrorArchive.indexOf("ErrorFix") !== -1) {
		return clientAPI.executeAction("/SmartInspections/Actions/ErrorFixSave_SuccessMessage.action");
	}
}