export default function QualitativePFFPage_SaveValidations(clientAPI) {
	// Getting the controls and values
	var status = clientAPI.evaluateTargetPath('#Page:QualitativePFF/#Control:Status/#Value');
	//var defectCodeGroup = clientAPI.evaluateTargetPath('#Page:QualitativePFF/#Control:DefectCodeGroup/#Value');
	var defectCode = clientAPI.evaluateTargetPath('#Page:QualitativePFF/#Control:DefectCode/#Value');
	var statusControl = clientAPI.evaluateTargetPath('#Page:QualitativePFF/#Control:Status');
	var defectCodeGroupControl = clientAPI.evaluateTargetPath('#Page:QualitativePFF/#Control:DefectCodeGroup');
	var defectCodeControl = clientAPI.evaluateTargetPath('#Page:QualitativePFF/#Control:DefectCode');

	var saveStatus = clientAPI.getPageProxy().getBindingObject().Status;
	var lastPressed;
	var isActionItem = clientAPI.getPageProxy().getPressedItem().isActionItem();
	var isToolbarItem = clientAPI.getPageProxy().getPressedItem().isToolbarItem();

	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	pageClientData.PageName = "QualitativePFF";

	let histClientData = '';
	var navFromHistory = '';

	try {
		histClientData = clientAPI.evaluateTargetPath("#Page:InspectionHistory/#ClientData");
		navFromHistory = histClientData.navFromHistory;
	} catch (err) {}

	if (navFromHistory === 'X') {
		return clientAPI.executeAction("/SmartInspections/Actions/ResultsRecording_CloseWOMessage.action");
	}

	if (isActionItem === true) {

		lastPressed = clientAPI.getPageProxy().getPressedItem().getActionItem();
		lastPressed = lastPressed.toString();
		pageClientData.LastPressed = lastPressed;

		// Checking if the status is filled
		if (Object.keys(status).length === 0 && lastPressed.indexOf("MDKActionItem") !== -1) {
			//return clientAPI.executeAction('/SmartInspections/Actions/RecordResultsBeforeNavToLongText_ErrorMessage.action');
			return clientAPI.executeAction("/SmartInspections/Actions/QualitativePFFPage_MorePopover.action");

		}

		/*if (lastPressed.indexOf("MDKActionItem") !== -1) {
			pageClientData.DataChanged = 'X';
		}*/

		// Checking if defect code group is filled
		if (Object.keys(status).length !== 0) {
			var statusSelectedValue = clientAPI.evaluateTargetPath('#Page:QualitativePFF/#Control:Status/#SelectedValue');
			if (statusSelectedValue === 'FAIL' || statusSelectedValue === 'FIX') {
				//if (Object.keys(defectCodeGroup).length !== 0) {
				//	var defectCodeGroupSelectedValue = clientAPI.evaluateTargetPath('#Page:QualitativePFF/#Control:DefectCodeGroup/#SelectedValue');
				//	if (defectCodeGroupSelectedValue === '') {
				//		return clientAPI.executeAction('/SmartInspections/Actions/DefectCodeGroupBlank_ErrorMessage.action');
				//	} else {
				if (Object.keys(defectCode).length !== 0) {
					var defectCodeSelectedValue = clientAPI.evaluateTargetPath('#Page:QualitativePFF/#Control:DefectCode/#SelectedValue');
					if (defectCodeSelectedValue === '') {
						return clientAPI.executeAction('/SmartInspections/Actions/DefectCodeBlank_ErrorMessage.action');
					}
				} else {
					return clientAPI.executeAction('/SmartInspections/Actions/DefectCodeBlank_ErrorMessage.action');
				}
				//	}
				//} else {
				//	return clientAPI.executeAction('/SmartInspections/Actions/DefectCodeGroupBlank_ErrorMessage.action');
				//}
			}
		}

	} else if (isToolbarItem === true) {

		lastPressed = clientAPI.getPageProxy().getPressedItem().getToolbarItem();
		lastPressed = lastPressed.toString();
		pageClientData.LastPressed = lastPressed;
		pageClientData.DataChanged = 'X';

		// Clearing values
		statusControl.setValue('', false);
		statusControl.setStyle('statusColorNeutral', 'Background');
		//statusControl.setEditable(false);
		statusControl.redraw();
		defectCodeGroupControl.setValue('', false);
		defectCodeGroupControl.setEditable(false);
		defectCodeGroupControl.setStyle('nonEditableFields', 'Background');
		defectCodeGroupControl.redraw();
		defectCodeControl.setValue('', false);
		defectCodeControl.setEditable(false);
		defectCodeControl.setStyle('nonEditableFields', 'Background');
		defectCodeControl.redraw();
	}

	if (pageClientData.DataChanged !== 'X') {
		if (lastPressed.indexOf("MDKActionItem") !== -1) {
			return clientAPI.executeAction("/SmartInspections/Actions/QualitativePFFPage_MorePopover.action");
		} else {
			return clientAPI.executeAction("/SmartInspections/Actions/QualitativePFFClose_Complete.action");
		}
	}

	// If all validations pass, save the changes
	return clientAPI.executeAction('/SmartInspections/Actions/QualitativePFFSave_UpdateEntity.action');
}