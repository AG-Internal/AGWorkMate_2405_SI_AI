export default function QuantitativeMultipleReading_OnValueChange(clientAPI) {
	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	pageClientData.DataChanged = 'X';

	// Getting controls, binding and values
	var quantitativeReading;
	var hasErrors = '';
	var hasCharErrors = '';
	var sum = 0;
	var quantitativeReadingControl = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:QuantitativeReading');
	var statusControl = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:Status');
	var defectCodeGroupControl = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:DefectCodeGroup');
	var defectCodeControl = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:DefectCode');
	//var defectCodeGroup = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:DefectCodeGroup/#Value');
	var numberOfSamples = clientAPI.getPageProxy().getBindingObject().NumberOfSamples;
	var sampleCriteria = clientAPI.getPageProxy().getBindingObject().SampleCriteria;
	var sampleReadingArray = [];

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

	// Checking for all sample reading values
	for (var i = 1; i <= numberOfSamples; i++) {
		var controlName = 'SampleReading' + i;
		var sampleReadingControl = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:' + controlName);
		var sampleReading = sampleReadingControl.getValue();
		sampleReading = sampleReading.replace(',', '.');
		var sampleReadingString = sampleReading.replace(',', '.');
		sampleReading = Number(sampleReading);
		// If the quantitative reading is not a number
		// Set the value to be blank and the status to be blank with no color
		if (isNaN(sampleReading) || sampleReadingString === '') {
			hasErrors = 'X';
			if (sampleReadingString !== '-') {
				sampleReadingControl.setValue('', false);
			}
			break;
		} else {
			sum = sum + sampleReading;
			sampleReadingArray.push(sampleReading);

			var numberOfCharacters = clientAPI.getPageProxy().getBindingObject().NumberOfCharacters;
			var numberOfDecimals = clientAPI.getPageProxy().getBindingObject().NumberOfDecimals;
			//alert(numberOfCharacters + "~" + numberOfDecimals);
			var quantitativeReadingStringSplit = sampleReadingString.split('.');
			var quantitativeReadingCharacters = quantitativeReadingStringSplit[0].length;
			var quantitativeReadingDecimals = 0;
			numberOfCharacters = Number(numberOfCharacters);
			numberOfDecimals = Number(numberOfDecimals);
			var numberOfCharactersFinal = numberOfCharacters - numberOfDecimals;

			if (quantitativeReadingStringSplit.length > 1) {
				quantitativeReadingDecimals = quantitativeReadingStringSplit[1].length;
			}

			if (quantitativeReadingCharacters > numberOfCharactersFinal) {
				hasCharErrors = 'X';
				sampleReadingControl.setValue('', false);
			}

			if (quantitativeReadingDecimals > numberOfDecimals) {
				hasCharErrors = 'X';
				sampleReadingControl.setValue('', false);
			}
		}
	}

	// If atleast one sample reading has an invalid entry
	if (hasErrors === 'X' || hasCharErrors === 'X') {
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
		if (hasCharErrors === 'X') {
			return clientAPI.executeAction('/SmartInspections/Actions/QuantitativeReadingInvalid_ErrorMessage.action');
		} else {
			return;
		}
	} else {}

	var numberOfDecimalPoints = clientAPI.getPageProxy().getBindingObject().NumberOfDecimals;
	if (sampleCriteria === 'AVG') {
		quantitativeReading = (sum / numberOfSamples).toFixed(numberOfDecimalPoints);
		quantitativeReadingControl.setValue(quantitativeReading, false);
	} else if (sampleCriteria === 'MIN') {
		var quantitativeReading = (Math.min(...sampleReadingArray)).toFixed(numberOfDecimalPoints);
		quantitativeReadingControl.setValue(quantitativeReading, false);
	} else if (sampleCriteria === 'MAX') {
		var quantitativeReading = (Math.max(...sampleReadingArray)).toFixed(numberOfDecimalPoints);
		quantitativeReadingControl.setValue(quantitativeReading, false);
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