export default function QuantitativeReading_OnValueChange(clientAPI) {
	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	pageClientData.DataChanged = 'X';

	// Getting the controls
	var quantitativeReadingControl = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:QuantitativeReading');
	var statusControl = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:Status');
	var defectCodeGroupControl = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:DefectCodeGroup');
	var defectCodeControl = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:DefectCode');
	//var defectCodeGroup = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:DefectCodeGroup/#Value');

	// Getting the quantitative reading 
	// Replacing commas with periods and converting it to a number
	var quantitativeReading = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:QuantitativeReading/#Value');
	quantitativeReading = quantitativeReading.replace(',', '.');
	var quantitativeReadingString = quantitativeReading.replace(',', '.');
	quantitativeReading = Number(quantitativeReading);

	// Getting the lower limit
	// Replacing commas with periods and converting it to a number
	var lowerLimit = clientAPI.getPageProxy().getBindingObject().LowerLimit;
	var lowerLimitString = lowerLimit.replace(',', '.');
	lowerLimit = lowerLimit.replace(',', '.');
	lowerLimit = Number(lowerLimit);

	// Getting the upper limit
	// Replacing commas with periods and converting it to a number
	var upperLimit = clientAPI.getPageProxy().getBindingObject().UpperLimit;
	var upperLimitString = upperLimit.replace(',', '.');
	upperLimit = upperLimit.replace(',', '.');
	upperLimit = Number(upperLimit);

	// If the quantitative reading is not a number
	// Set the value to be blank and the status to be blank with no color
	if (isNaN(quantitativeReading) || quantitativeReadingString === '') {
		if (quantitativeReadingString !== '-') {
			quantitativeReadingControl.setValue('', false);
		}
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
		return;
	}

	var numberOfCharacters = clientAPI.getPageProxy().getBindingObject().NumberOfCharacters;
	var numberOfDecimals = clientAPI.getPageProxy().getBindingObject().NumberOfDecimals;
	var quantitativeReadingStringSplit = quantitativeReadingString.split('.');
	var quantitativeReadingCharacters = quantitativeReadingStringSplit[0].length;
	var quantitativeReadingDecimals = 0;
	numberOfCharacters = Number(numberOfCharacters);
	numberOfDecimals = Number(numberOfDecimals);
	var numberOfCharactersFinal = numberOfCharacters - numberOfDecimals;

	if (quantitativeReadingStringSplit.length > 1) {
		quantitativeReadingDecimals = quantitativeReadingStringSplit[1].length;
	}

	if (quantitativeReadingCharacters > numberOfCharactersFinal) {
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
		return clientAPI.executeAction('/SmartInspections/Actions/QuantitativeReadingInvalid_ErrorMessage.action');
	}

	if (quantitativeReadingDecimals > numberOfDecimals) {
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
		return clientAPI.executeAction('/SmartInspections/Actions/QuantitativeReadingInvalid_ErrorMessage.action');
	}

	// Updating the status based on the quantitative reading
	if (quantitativeReading > upperLimit && !isNaN(upperLimit) && upperLimitString != '') { // If quantitative reading is greater than the upper limit, show as fail
		statusControl.setValue('FAIL', false);
		statusControl.setStyle('statusColorFail', 'Background');
		statusControl.setEditable(true);
		statusControl.redraw();
		defectCodeControl.setEditable(true);
		defectCodeControl.setStyle('editableFields', 'Background');
		defectCodeControl.redraw();
		/*if (Object.keys(defectCodeGroup).length === 0) {
			defectCodeControl.setEditable(false);
			defectCodeControl.setStyle('nonEditableFields', 'Background');
			defectCodeControl.redraw();
		} else {
			defectCodeControl.setEditable(true);
			defectCodeControl.setStyle('editableFields', 'Background');
			defectCodeControl.redraw();
		}*/
	} else if (quantitativeReading < lowerLimit && !isNaN(lowerLimit) && lowerLimitString != '') { // If quantitative reading is lower than the lower limit, show as fail
		statusControl.setValue('FAIL', false);
		statusControl.setStyle('statusColorFail', 'Background');
		statusControl.setEditable(true);
		statusControl.redraw();
		defectCodeControl.setEditable(true);
		defectCodeControl.setStyle('editableFields', 'Background');
		defectCodeControl.redraw();
		/*if (Object.keys(defectCodeGroup).length === 0) {
			defectCodeControl.setEditable(false);
			defectCodeControl.setStyle('nonEditableFields', 'Background');
			defectCodeControl.redraw();
		} else {
			defectCodeControl.setEditable(true);
			defectCodeControl.setStyle('editableFields', 'Background');
			defectCodeControl.redraw();
		}*/
	} else { // If quantitative reading is within the lower and upper limit, show as pass
		statusControl.setValue('PASS', false);
		statusControl.setStyle('statusColorPass', 'Background');
		statusControl.setEditable(true);
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
}