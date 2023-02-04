export default function QuantitativePage_SaveValidations(clientAPI) {

	// Getting the controls and values
	var status = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:Status/#Value');
	var quantitativeReading = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:QuantitativeReading/#Value');
	//var defectCodeGroup = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:DefectCodeGroup/#Value');
	var defectCode = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:DefectCode/#Value');
	var quantitativeReadingControl = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:QuantitativeReading');
	var statusControl = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:Status');
	var defectCodeGroupControl = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:DefectCodeGroup');
	var defectCodeControl = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:DefectCode');

	// Getting data binding
	var plausibleMessageType = clientAPI.getPageProxy().getBindingObject().PlausibleMessageType;
	var lowerPlausibleLimit = clientAPI.getPageProxy().getBindingObject().LowerPlausibleLimit;
	var upperPlausibleLimit = clientAPI.getPageProxy().getBindingObject().UpperPlausibleLimit;
	var lowerLimit = clientAPI.getPageProxy().getBindingObject().LowerLimit;
	var upperLimit = clientAPI.getPageProxy().getBindingObject().UpperLimit;
	var lastPressed;
	var isActionItem = clientAPI.getPageProxy().getPressedItem().isActionItem();
	var isToolbarItem = clientAPI.getPageProxy().getPressedItem().isToolbarItem();

	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	pageClientData.PageName = "Quantitative";

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

		// Getting upper and lower plausible limits with message type
		lowerPlausibleLimit = lowerPlausibleLimit.replace(',', '.');
		lowerPlausibleLimit = Number(lowerPlausibleLimit);

		upperPlausibleLimit = upperPlausibleLimit.replace(',', '.');
		upperPlausibleLimit = Number(upperPlausibleLimit);

		// Getting the quantitative reading 
		// replacing commas with periods and converting it to a number
		quantitativeReading = quantitativeReading.replace(',', '.');
		if (quantitativeReading != '') {
			quantitativeReading = Number(quantitativeReading);
		}

		// Getting the lower limit
		// replacing commas with periods and converting it to a number
		lowerLimit = lowerLimit.replace(',', '.');
		var lowerLimitString = lowerLimit.replace(',', '.');
		lowerLimit = Number(lowerLimit);

		// Getting the upper limit
		// replacing commas with periods and converting it to a number
		upperLimit = upperLimit.replace(',', '.');
		var upperLimitString = upperLimit.replace(',', '.');
		upperLimit = Number(upperLimit);

		// Checking if Quantitative reading is blank or not a number
		if ((quantitativeReading == '' || isNaN(quantitativeReading)) && lastPressed.indexOf("MDKActionItem") !== -1) {
			//return clientAPI.executeAction('/SmartInspections/Actions/RecordResultsBeforeNavToLongText_ErrorMessage.action');
			return clientAPI.executeAction("/SmartInspections/Actions/QuantitativePage_MorePopover.action");
		} else if (isNaN(quantitativeReading)) {
			return clientAPI.executeAction('/SmartInspections/Actions/InvalidResultRecording_ErrorMessage.action');
		} else if ((quantitativeReading != '' && !isNaN(quantitativeReading))) { // && lastPressed.indexOf("NavigationButton") === -1) {

			// Checking if the status values is correct
			if (quantitativeReading > upperLimit && !isNaN(upperLimit) && upperLimitString != '') {
				if (Object.keys(status).length !== 0) {
					var statusSelectedValue = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:Status/#SelectedValue');
					if (statusSelectedValue === 'PASS' || statusSelectedValue === 'FIX') {
						return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectFail_ErrorMessage.action');
					}
				} else {
					return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectFail_ErrorMessage.action');
				}
			} else if (quantitativeReading < lowerLimit && !isNaN(lowerLimit) && lowerLimitString != '') {
				if (Object.keys(status).length !== 0) {
					var statusSelectedValue = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:Status/#SelectedValue');
					if (statusSelectedValue === 'PASS' || statusSelectedValue === 'FIX') {
						return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectFail_ErrorMessage.action');
					}
				} else {
					return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectFail_ErrorMessage.action');
				}
			} else {
				if (Object.keys(status).length !== 0) {
					var statusSelectedValue = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:Status/#SelectedValue');
					if (statusSelectedValue === 'FAIL') {
						return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectPassFix_ErrorMessage.action');
					}
				} else {
					return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectPassFix_ErrorMessage.action');
				}
			}

			/*if (lastPressed.indexOf("MDKActionItem") !== -1) {
				pageClientData.DataChanged = 'X';
			}*/

			// Checking if defect code group is filled
			if (Object.keys(status).length !== 0) {
				var statusSelectedValue = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:Status/#SelectedValue');
				if (statusSelectedValue === 'FAIL' || statusSelectedValue === 'FIX') {
					//if (Object.keys(defectCodeGroup).length !== 0) {
					//	var defectCodeGroupSelectedValue = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:DefectCodeGroup/#SelectedValue');
					//	if (defectCodeGroupSelectedValue === '') {
					//		return clientAPI.executeAction('/SmartInspections/Actions/DefectCodeGroupBlank_ErrorMessage.action');
					//	} else {
					if (Object.keys(defectCode).length !== 0) {
						var defectCodeSelectedValue = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:DefectCode/#SelectedValue');
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

			// Checking if the plausible limits have been reached
			if (quantitativeReading > upperPlausibleLimit && !isNaN(upperPlausibleLimit) && upperPlausibleLimit != 0) {
				if (plausibleMessageType === 'W') {
					if (lastPressed.indexOf("MDKActionItem") === -1) {
						return clientAPI.executeAction('/SmartInspections/Actions/QuantitativePlausibleLimit_WarningMessage.action');
						//return clientAPI.executeAction('/SmartInspections/Actions/Save_SuccessMessage.action');
					}
				} else if (plausibleMessageType === 'E') {
					return clientAPI.executeAction('/SmartInspections/Actions/QuantitativePlausibleLimit_ErrorMessage.action');
				}
			} else if (quantitativeReading < lowerPlausibleLimit && !isNaN(lowerPlausibleLimit) && lowerPlausibleLimit != 0) {
				if (plausibleMessageType === 'W') {
					if (lastPressed.indexOf("MDKActionItem") === -1) {
						return clientAPI.executeAction('/SmartInspections/Actions/QuantitativePlausibleLimit_WarningMessage.action');
						//return clientAPI.executeAction('/SmartInspections/Actions/Save_SuccessMessage.action');
					}
				} else if (plausibleMessageType === 'E') {
					return clientAPI.executeAction('/SmartInspections/Actions/QuantitativePlausibleLimit_ErrorMessage.action');
				}
			}
		}

	} else if (isToolbarItem === true) {

		lastPressed = clientAPI.getPageProxy().getPressedItem().getToolbarItem();
		lastPressed = lastPressed.toString();
		pageClientData.LastPressed = lastPressed;
		pageClientData.DataChanged = 'X';

		// Clearing values
		quantitativeReadingControl.setValue('', false);
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
			return clientAPI.executeAction("/SmartInspections/Actions/QuantitativePage_MorePopover.action");
		} else {
			return clientAPI.executeAction("/SmartInspections/Actions/QuantitativeClose_Complete.action");
		}
	}

	// If all validations pass, save the changes
	//setTimeout(function () {
	return clientAPI.executeAction('/SmartInspections/Actions/QuantitativeSave_UpdateEntity.action');
	//}, 1000);
}