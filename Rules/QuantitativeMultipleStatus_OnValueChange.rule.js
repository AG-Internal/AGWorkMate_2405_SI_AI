export default function QuantitativeMultipleStatus_OnValueChange(clientAPI) {
	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	pageClientData.DataChanged = 'X';

	var statusControl = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:Status');
	var status = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:Status/#SelectedValue');
	var defectCodeGroupControl = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:DefectCodeGroup');
	var defectCodeControl = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:DefectCode');
	var defectCode = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:DefectCode/#Value');

	// Getting the quantitative reading 
	// Replacing commas with periods and converting it to a number
	var quantitativeReading = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:QuantitativeReading/#Value');
	quantitativeReading = quantitativeReading.replace(',', '.');
	quantitativeReading = Number(quantitativeReading);

	// Getting the lower limit
	// Replacing commas with periods and converting it to a number
	var lowerLimit = clientAPI.getPageProxy().getBindingObject().LowerLimit;
	lowerLimit = lowerLimit.replace(',', '.');
	lowerLimit = Number(lowerLimit);

	// Getting the upper limit
	// Replacing commas with periods and converting it to a number
	var upperLimit = clientAPI.getPageProxy().getBindingObject().UpperLimit;
	upperLimit = upperLimit.replace(',', '.');
	upperLimit = Number(upperLimit);

	if (status === 'FAIL') {
		if ((quantitativeReading > upperLimit && !isNaN(upperLimit) && upperLimit != 0) || (quantitativeReading < lowerLimit && !isNaN(lowerLimit) &&
				lowerLimit != 0)) {} else {
			if (Object.keys(defectCode).length !== 0) {
				statusControl.setValue('FIX');
				statusControl.setStyle('statusColorFix', 'Background');
				statusControl.redraw();
			} else {
				statusControl.setValue('PASS');
				statusControl.setStyle('statusColorPass', 'Background');
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
			return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectPassFix_ErrorMessage.action');
		}
		statusControl.setStyle('statusColorFail', 'Background');
		statusControl.redraw();
		defectCodeControl.setEditable(true);
		defectCodeControl.setStyle('editableFields', 'Background');
		defectCodeControl.redraw();
	} else if (status === 'FIX') {
		if ((quantitativeReading > upperLimit && !isNaN(upperLimit) && upperLimit != 0) || (quantitativeReading < lowerLimit && !isNaN(lowerLimit) &&
				lowerLimit != 0)) {
			statusControl.setValue('FAIL');
			statusControl.setStyle('statusColorFail', 'Background');
			statusControl.redraw();
			return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectFail_ErrorMessage.action');
		}
		statusControl.setStyle('statusColorFix', 'Background');
		statusControl.redraw();
		defectCodeControl.setEditable(true);
		defectCodeControl.setStyle('editableFields', 'Background');
		defectCodeControl.redraw();
	} else if (status === 'PASS') {
		if ((quantitativeReading > upperLimit && !isNaN(upperLimit) && upperLimit != 0) || (quantitativeReading < lowerLimit && !isNaN(lowerLimit) &&
				lowerLimit != 0)) {
			statusControl.setValue('FAIL');
			statusControl.setStyle('statusColorFail', 'Background');
			statusControl.redraw();
			return clientAPI.executeAction('/SmartInspections/Actions/StatusInvalid_SelectFail_ErrorMessage.action');
		}
		statusControl.setStyle('statusColorPass', 'Background');
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