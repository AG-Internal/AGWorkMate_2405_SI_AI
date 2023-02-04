export default function QuantitativeMultiplePage_SaveValidations(clientAPI) {

	// Getting the controls and values
	var hasErrors = 'X';

	var status = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:Status/#Value');
	var quantitativeReading = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:QuantitativeReading/#Value');
	//var defectCodeGroup = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:DefectCodeGroup/#Value');
	var defectCode = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:DefectCode/#Value');
	var quantitativeReadingControl = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:QuantitativeReading');
	var statusControl = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:Status');
	var defectCodeGroupControl = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:DefectCodeGroup');
	var defectCodeControl = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:DefectCode');

	// Getting data binding
	var plausibleMessageType = clientAPI.getPageProxy().getBindingObject().PlausibleMessageType;
	var lowerPlausibleLimit = clientAPI.getPageProxy().getBindingObject().LowerPlausibleLimit;
	var upperPlausibleLimit = clientAPI.getPageProxy().getBindingObject().UpperPlausibleLimit;
	var lowerLimit = clientAPI.getPageProxy().getBindingObject().LowerLimit;
	var upperLimit = clientAPI.getPageProxy().getBindingObject().UpperLimit;
	var numberOfSamples = clientAPI.getPageProxy().getBindingObject().NumberOfSamples;
	var lastPressed;
	var isActionItem = clientAPI.getPageProxy().getPressedItem().isActionItem();
	var isToolbarItem = clientAPI.getPageProxy().getPressedItem().isToolbarItem();

	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	pageClientData.PageName = "QuantitativeMultiple";

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
		if (lowerPlausibleLimit != '') {
			lowerPlausibleLimit = Number(lowerPlausibleLimit);
		}

		upperPlausibleLimit = upperPlausibleLimit.replace(',', '.');
		if (upperPlausibleLimit != '') {
			upperPlausibleLimit = Number(upperPlausibleLimit);
		}

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
		if (lowerLimit != '') {
			lowerLimit = Number(lowerLimit)
		};

		// Getting the upper limit
		// replacing commas with periods and converting it to a number
		upperLimit = upperLimit.replace(',', '.');
		var upperLimitString = upperLimit.replace(',', '.');
		if (upperLimit != '') {
			upperLimit = Number(upperLimit);
		};

		// Checking for all sample reading values
		for (var i = 1; i <= numberOfSamples; i++) {
			var controlName = 'SampleReading' + i;
			var sampleReadingControl = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:' + controlName);
			var sampleReading = sampleReadingControl.getValue();
			sampleReading = sampleReading.replace(',', '.');
			if (sampleReading != '') {
				sampleReading = Number(sampleReading);
			}
			// If the quantitative reading is not a number
			if (isNaN(sampleReading) || sampleReading === '') {} else {
				hasErrors = '';
			}
		}

		// Checking for blank entries
		//if (hasErrors === 'X' && lastPressed.indexOf("MDKActionItem") !== -1) {
		if ((isNaN(quantitativeReading) || quantitativeReading === '') && lastPressed.indexOf("MDKActionItem") !== -1) {
			//return clientAPI.executeAction('/SmartInspections/Actions/RecordResultsBeforeNavToLongText_ErrorMessage.action');
			return clientAPI.executeAction("/SmartInspections/Actions/QuantitativeMultiplePage_MorePopover.action");
		} else if (isNaN(quantitativeReading)) { //|| quantitativeReading === '') {
			return clientAPI.executeAction('/SmartInspections/Actions/InvalidResultRecording_ErrorMessage.action');
		} else if (hasErrors !== 'X') { //&& lastPressed.indexOf("NavigationButton") === -1) {

			// Checking if the status values is correct
			if (!isNaN(quantitativeReading) && quantitativeReading !== '') {
				if (quantitativeReading > upperLimit && !isNaN(upperLimit) && upperLimitString != '') {
					if (Object.keys(status).length !== 0) {
						var statusSelectedValue = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:Status/#SelectedValue');
						if (statusSelectedValue === 'PASS' || statusSelectedValue === 'FIX') {
							return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectFail_ErrorMessage.action');
						}
					} else {
						return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectFail_ErrorMessage.action');
					}
				} else if (quantitativeReading < lowerLimit && !isNaN(lowerLimit) && lowerLimitString != '') {
					if (Object.keys(status).length !== 0) {
						var statusSelectedValue = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:Status/#SelectedValue');
						if (statusSelectedValue === 'PASS' || statusSelectedValue === 'FIX') {
							return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectFail_ErrorMessage.action');
						}
					} else {
						return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectFail_ErrorMessage.action');
					}
				} else {
					if (Object.keys(status).length !== 0) {
						var statusSelectedValue = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:Status/#SelectedValue');
						if (statusSelectedValue === 'FAIL') {
							return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectPassFix_ErrorMessage.action');
						}
					} else {
						return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectPassFix_ErrorMessage.action');
					}
				}
			}

			/*if (lastPressed.indexOf("MDKActionItem") !== -1) {
				pageClientData.DataChanged = 'X';
			}*/

			// Checking if defect code group is filled
			if (!isNaN(quantitativeReading) && quantitativeReading !== '') {
				if (Object.keys(status).length !== 0) {
					var statusSelectedValue = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:Status/#SelectedValue');
					if (statusSelectedValue === 'FAIL' || statusSelectedValue === 'FIX') {
						//if (Object.keys(defectCodeGroup).length !== 0) {
						//var defectCodeGroupSelectedValue = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:DefectCodeGroup/#SelectedValue');
						//if (defectCodeGroupSelectedValue === '') {
						//	return clientAPI.executeAction('/SAPAssetManager/Actions/SmartInspection/DefectCodeGroupBlank_ErrorMessage.action');
						//} else {
						if (Object.keys(defectCode).length !== 0) {
							var defectCodeSelectedValue = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:DefectCode/#SelectedValue');
							if (defectCodeSelectedValue === '') {
								return clientAPI.executeAction('/SmartInspections/Actions/DefectCodeBlank_ErrorMessage.action');
							}
						} else {
							return clientAPI.executeAction('/SmartInspections/Actions/DefectCodeBlank_ErrorMessage.action');
						}
						//}
						//} else {
						//	return clientAPI.executeAction('/SAPAssetManager/Actions/SmartInspection/DefectCodeGroupBlank_ErrorMessage.action');
						//}
					} else if (statusSelectedValue === 'PASS') {
						//if (Object.keys(defectCodeGroup).length !== 0) {
						//	return clientAPI.executeAction('/SAPAssetManager/Actions/SmartInspection/DefectCodeGroupNotBlank_ErrorMessage.action');
						//} else {
						if (Object.keys(defectCode).length !== 0) {
							return clientAPI.executeAction('/SmartInspections/Actions/DefectCodeNotBlank_ErrorMessage.action');
						}
						//}
					}
				}
			}

			// Checking if the plausible limits have been reached
			if (!isNaN(quantitativeReading) && quantitativeReading !== '') {
				if (quantitativeReading > upperPlausibleLimit && !isNaN(upperPlausibleLimit) && upperPlausibleLimit != '') {
					if (plausibleMessageType === 'W') {
						if (lastPressed.indexOf("MDKActionItem") === -1) {
							return clientAPI.executeAction('/SmartInspections/Actions/QuantitativeMultiplePlausibleLimit_WarningMessage.action');
							//return clientAPI.executeAction('/SAPAssetManager/Actions/SmartInspection/Save_SuccessMessage.action');
						}
					} else if (plausibleMessageType === 'E') {
						return clientAPI.executeAction('/SmartInspections/Actions/QuantitativeMultiplePlausibleLimit_ErrorMessage.action');
					}
				} else if (quantitativeReading < lowerPlausibleLimit && !isNaN(lowerPlausibleLimit) && lowerPlausibleLimit != '') {
					if (plausibleMessageType === 'W') {
						if (lastPressed.indexOf("MDKActionItem") === -1) {
							return clientAPI.executeAction('/SmartInspections/Actions/QuantitativeMultiplePlausibleLimit_WarningMessage.action');
							//return clientAPI.executeAction('/SAPAssetManager/Actions/SmartInspection/Save_SuccessMessage.action');
						}
					} else if (plausibleMessageType === 'E') {
						return clientAPI.executeAction('/SmartInspections/Actions/QuantitativeMultiplePlausibleLimit_ErrorMessage.action');
					}
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

		// Clearing all sample reading values
		for (var i = 1; i <= numberOfSamples; i++) {
			var controlName = 'SampleReading' + i;
			var sampleReadingControl = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:' + controlName);
			sampleReadingControl.setValue('', false);
		}
	}

	if (pageClientData.DataChanged !== 'X') {
		if (lastPressed.indexOf("MDKActionItem") !== -1) {
			return clientAPI.executeAction("/SmartInspections/Actions/QuantitativeMultiplePage_MorePopover.action");
		} else {
			return clientAPI.executeAction("/SmartInspections/Actions/QuantitativeMultipleClose_Complete.action");
		}
	}

	// If all validations pass, save the changes
	return clientAPI.executeAction('/SmartInspections/Actions/QuantitativeMultipleSave_UpdateEntity.action');
}