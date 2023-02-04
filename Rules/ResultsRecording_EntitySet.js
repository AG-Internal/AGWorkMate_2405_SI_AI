export default function ResultsRecording_EntitySet(clientAPI) {
	let histClientData = '';
	var entitySet = '';
	var navFromHistory = '';
	
	try {
		histClientData = clientAPI.evaluateTargetPath("#Page:InspectionHistory/#ClientData");
		navFromHistory = histClientData.navFromHistory;
	} catch (err) {}
	if (navFromHistory === 'X') {
		entitySet = 'HistoryDetailsSet';
	} else {
		entitySet = 'InspectionCharacteristicDetailsSet';
	}
	return entitySet;
}