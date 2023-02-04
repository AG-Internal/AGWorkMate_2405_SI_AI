export default function QualitativeYNPage_SaveValidations(clientAPI) {

	// Getting the controls and values
	var status = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:Status/#Value');
	var qualitativeReading = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:QualitativeReading/#Value');
	//var defectCodeGroup = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:DefectCodeGroup/#Value');
	var defectCode = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:DefectCode/#Value');
	var qualitativeReadingControl = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:QualitativeReading');
	var statusControl = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:Status');
	var defectCodeGroupControl = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:DefectCodeGroup');
	var defectCodeControl = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:DefectCode');

	var saveStatus = clientAPI.getPageProxy().getBindingObject().Status;
	var lastPressed;
	var isActionItem = clientAPI.getPageProxy().getPressedItem().isActionItem();
	var isToolbarItem = clientAPI.getPageProxy().getPressedItem().isToolbarItem();
	var emptySave = 1;

	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	pageClientData.PageName = "QualitativeYN";

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

		// Checking if Qualitative reading is blank or not a number
		if (Object.keys(qualitativeReading).length !== 0) {
			var qualitativeReadingSelectedValue = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:QualitativeReading/#SelectedValue');
			if (qualitativeReadingSelectedValue === '' && lastPressed.indexOf("MDKActionItem") !== -1) {
				//return clientAPI.executeAction('/SmartInspections/Actions/RecordResultsBeforeNavToLongText_ErrorMessage.action');
				return clientAPI.executeAction("/SmartInspections/Actions/QualitativeYNPage_MorePopover.action");
			} else if (qualitativeReadingSelectedValue !== '') { // && lastPressed.indexOf("NavigationButton") === -1) {
				emptySave = 0;
			}
		} else {
			if (lastPressed.indexOf("MDKActionItem") !== -1) {
				//return clientAPI.executeAction('/SmartInspections/Actions/RecordResultsBeforeNavToLongText_ErrorMessage.action');
				return clientAPI.executeAction("/SmartInspections/Actions/QualitativeYNPage_MorePopover.action");
			}
		}

		/*if (lastPressed.indexOf("MDKActionItem") !== -1) {
			pageClientData.DataChanged = 'X';
		}*/

		// Checking if the status is correct
		if (emptySave === 0) {
			var codeValuation = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:QualitativeReading/#Value')[0].DisplayValue.StatusText;
			if (codeValuation === 'A') {
				if (Object.keys(status).length !== 0) {
					var statusSelectedValue = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:Status/#SelectedValue');
					if (statusSelectedValue === 'FAIL') {
						return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectPassFix_ErrorMessage.action');
					}
				} else {
					return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectPassFix_ErrorMessage.action');
				}
			} else if (codeValuation === 'F') {
				if (Object.keys(status).length !== 0) {
					var statusSelectedValue = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:Status/#SelectedValue');
					if (statusSelectedValue === 'FAIL') {
						return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectPassFix_ErrorMessage.action');
					}
				} else {
					return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectPassFix_ErrorMessage.action');
				}
			} else if (codeValuation === 'R') {
				if (Object.keys(status).length !== 0) {
					var statusSelectedValue = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:Status/#SelectedValue');
					if (statusSelectedValue !== 'FAIL') {
						return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectFail_ErrorMessage.action');
					}
				} else {
					return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectFail_ErrorMessage.action');
				}
			}

			// Checking if defect code group is filled
			if (Object.keys(status).length !== 0) {
				var statusSelectedValue = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:Status/#SelectedValue');
				if (statusSelectedValue === 'FAIL' || statusSelectedValue === 'FIX') {
					//if (Object.keys(defectCodeGroup).length !== 0) {
					//var defectCodeGroupSelectedValue = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:DefectCodeGroup/#SelectedValue');
					//if (defectCodeGroupSelectedValue === '') {
					//	return clientAPI.executeAction('/SmartInspections/Actions/DefectCodeGroupBlank_ErrorMessage.action');
					//} else {
					if (Object.keys(defectCode).length !== 0) {
						var defectCodeSelectedValue = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:DefectCode/#SelectedValue');
						if (defectCodeSelectedValue === '') {
							return clientAPI.executeAction('/SmartInspections/Actions/DefectCodeBlank_ErrorMessage.action');
						}
					} else {
						return clientAPI.executeAction('/SmartInspections/Actions/DefectCodeBlank_ErrorMessage.action');
					}
					//}
					//} else {
					//	return clientAPI.executeAction('/SmartInspections/Actions/DefectCodeGroupBlank_ErrorMessage.action');
					//}
				} else if (statusSelectedValue === 'PASS') {
					//if (Object.keys(defectCodeGroup).length !== 0) {
					//	return clientAPI.executeAction('/SmartInspections/Actions/DefectCodeGroupNotBlank_ErrorMessage.action');
					//} else {
					if (Object.keys(defectCode).length !== 0) {
						return clientAPI.executeAction('/SmartInspections/Actions/DefectCodeNotBlank_ErrorMessage.action');
					}
					//}
				}
			}
		}

	} else if (isToolbarItem === true) {

		lastPressed = clientAPI.getPageProxy().getPressedItem().getToolbarItem();
		lastPressed = lastPressed.toString();
		pageClientData.LastPressed = lastPressed;
		pageClientData.DataChanged = 'X';

		// Clearing values
		qualitativeReadingControl.setValue('', false);
		statusControl.setValue('', false);
		statusControl.setStyle('statusColorNeutral', 'Background');
		statusControl.setEditable(false);
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
			return clientAPI.executeAction("/SmartInspections/Actions/QualitativeYNPage_MorePopover.action");
		} else {
			return clientAPI.executeAction("/SmartInspections/Actions/QualitativeYNClose_Complete.action");
		}
	}

	// If all validations pass, save the changes
	return clientAPI.executeAction('/SmartInspections/Actions/QualitativeYNSave_UpdateEntity.action');
}