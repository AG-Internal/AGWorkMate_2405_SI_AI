export default function ResultsRecordingMorePopover_SetVisible(clientAPI) {
	let histClientData = '';
	var setVisible = true;
	var vanFromHistory = '';

	try {
		histClientData = clientAPI.evaluateTargetPath("#Page:InspectionHistory/#ClientData");
		vanFromHistory = histClientData.navFromHistory;
	} catch (err) {}

	if (vanFromHistory === 'X') {
		setVisible = false;
		return setVisible;
	} else {
		setVisible = true;
		return setVisible;
	}
}