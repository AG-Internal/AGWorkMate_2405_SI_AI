export default function QualitativeDateReading_OnValueChange(clientAPI) {
	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	pageClientData.DataChanged = 'X';
	
	// Getting the controls
	var statusControl = clientAPI.evaluateTargetPath('#Page:QualitativeDate/#Control:Status');

	// Getting the values
	var qualitativeReading = clientAPI.evaluateTargetPath('#Page:QualitativeDate/#Control:QualitativeReading/#Value');

	// Updating the status based on the qualitative reading
	if (qualitativeReading !== '') {
		statusControl.setValue('PASS', false);
		statusControl.setStyle('statusColorPass', 'Background');
	} else {
		statusControl.setValue('', false);
		statusControl.setStyle('statusColorNeutral', 'Background');
	}
}