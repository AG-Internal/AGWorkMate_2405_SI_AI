export default function QualitativeDatePage_SaveValidations(clientAPI) {
	var qualitativeReading = clientAPI.evaluateTargetPath('#Page:QualitativeDate/#Control:QualitativeReading/#Value');
	var status = clientAPI.evaluateTargetPath('#Page:QualitativeDate/#Control:Status/#Value');
	var qualitativeReadingControl = clientAPI.evaluateTargetPath('#Page:QualitativeDate/#Control:QualitativeReading');
	var statusControl = clientAPI.evaluateTargetPath('#Page:QualitativeDate/#Control:Status');

	var saveStatus = clientAPI.getPageProxy().getBindingObject().Status;
	var lastPressed;
	var isActionItem = clientAPI.getPageProxy().getPressedItem().isActionItem();
	var isToolbarItem = clientAPI.getPageProxy().getPressedItem().isToolbarItem();
	var today = new Date().toISOString();

	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	pageClientData.PageName = "QualitativeDate";

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
		if (qualitativeReading === '' && lastPressed.indexOf("MDKActionItem") !== -1) {
			//return clientAPI.executeAction('/SmartInspections/Actions/RecordResultsBeforeNavToLongText_ErrorMessage.action');
			return clientAPI.executeAction("/SmartInspections/Actions/QualitativeDatePage_MorePopover.action");
		}

		/*if (lastPressed.indexOf("MDKActionItem") !== -1) {
			pageClientData.DataChanged = 'X';
		}*/

		// Checking if the status is invalid
		if (Object.keys(status).length !== 0) {
			var statusSelectedValue = clientAPI.evaluateTargetPath('#Page:QualitativeDate/#Control:Status/#SelectedValue');
			if (statusSelectedValue !== 'PASS') {
				return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectPass_ErrorMessage.action');
			}
		} else {
			if (lastPressed.indexOf("MDKActionItem") !== -1) {
				//return clientAPI.executeAction('/SmartInspections/Actions/RecordResultsBeforeNavToLongText_ErrorMessage.action');
				return clientAPI.executeAction("/SmartInspections/Actions/QualitativeDatePage_MorePopover.action");
			}
		}

	} else if (isToolbarItem === true) {

		lastPressed = clientAPI.getPageProxy().getPressedItem().getToolbarItem();
		lastPressed = lastPressed.toString();
		pageClientData.LastPressed = lastPressed;
		pageClientData.DataChanged = 'X';

		// Clearing values
		qualitativeReadingControl.setValue(today, false);
		statusControl.setValue('', false);
		statusControl.setStyle('statusColorNeutral', 'Background');
		statusControl.redraw();

	}

	if (pageClientData.DataChanged !== 'X') {
		if (lastPressed.indexOf("MDKActionItem") !== -1) {
			return clientAPI.executeAction("/SmartInspections/Actions/QualitativeDatePage_MorePopover.action");
		} else {
			return clientAPI.executeAction("/SmartInspections/Actions/QualitativeDateClose_Complete.action");
		}
	}

	// If all validations pass, save the changes
	return clientAPI.executeAction('/SmartInspections/Actions/QualitativeDateSave_UpdateEntity.action');
}