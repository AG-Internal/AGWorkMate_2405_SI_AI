export default function QualitativeYNStatus_OnValueChange(clientAPI) {
	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	pageClientData.DataChanged = 'X';

	// Changing the status indicator based on the pressed value
	// Making defect code group and defect code editable based on the pressed value
	var statusControl = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:Status');
	var status = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:Status/#SelectedValue');
	var defectCodeGroupControl = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:DefectCodeGroup');
	var defectCodeControl = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:DefectCode');
	var defectCode = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:DefectCode/#Value');
	var codeValuation = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:QualitativeReading/#Value')[0].DisplayValue.StatusText;

	if (status === 'FAIL') {
		if (codeValuation !== 'R') {
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
		if (codeValuation === 'R') {
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
		if (codeValuation === 'R') {
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