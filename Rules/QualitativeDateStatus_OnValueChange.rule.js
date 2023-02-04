export default function QualitativeDateStatus_OnValueChange(clientAPI) {
	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	pageClientData.DataChanged = 'X';

	// Getting controls and values
	var statusControl = clientAPI.evaluateTargetPath('#Page:QualitativeDate/#Control:Status');
	var status = clientAPI.evaluateTargetPath('#Page:QualitativeDate/#Control:Status/#SelectedValue');

	//Checking for valid status
	if (status === 'PASS') {
		statusControl.setStyle('statusColorPass', 'Background');
		statusControl.redraw();
	} else if (status === 'FAIL') {
		statusControl.setValue('PASS');
		statusControl.setStyle('statusColorPass', 'Background');
		statusControl.redraw();
		return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectPass_ErrorMessage.action');
	} else if (status === 'FIX') {
		statusControl.setValue('PASS');
		statusControl.setStyle('statusColorPass', 'Background');
		statusControl.redraw();
		return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectPass_ErrorMessage.action');
	}
}