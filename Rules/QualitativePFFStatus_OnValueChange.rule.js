export default function QualitativePFFStatus_OnValueChange(clientAPI) {
	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	pageClientData.DataChanged = 'X';

	// Changing the status indicator based on the pressed value
	// Making defect code group and defect code editable based on the pressed value
	var statusControl = clientAPI.evaluateTargetPath('#Page:QualitativePFF/#Control:Status');
	var status = clientAPI.evaluateTargetPath('#Page:QualitativePFF/#Control:Status/#SelectedValue');
	var defectCodeGroupControl = clientAPI.evaluateTargetPath('#Page:QualitativePFF/#Control:DefectCodeGroup');
	var defectCodeControl = clientAPI.evaluateTargetPath('#Page:QualitativePFF/#Control:DefectCode');
	//var defectCodeGroup = clientAPI.evaluateTargetPath('#Page:QualitativePFF/#Control:DefectCodeGroup/#Value');

	if (status === 'FAIL') {
		statusControl.setStyle('statusColorFail', 'Background');
		statusControl.redraw();
		defectCodeControl.setEditable(true);
		defectCodeControl.setStyle('editableFields', 'Background');
		defectCodeControl.redraw();
		/*		defectCodeGroupControl.setEditable(true);
				defectCodeGroupControl.setStyle('editableFields', 'Background');
				defectCodeGroupControl.redraw();
				if (Object.keys(defectCodeGroup).length === 0) {
					defectCodeControl.setEditable(false);
					defectCodeControl.setStyle('nonEditableFields', 'Background');
					defectCodeControl.redraw();
				} else {
					defectCodeControl.setEditable(true);
					defectCodeControl.setStyle('editableFields', 'Background');
					defectCodeControl.redraw();
				}*/
	} else if (status === 'FIX') {
		statusControl.setStyle('statusColorFix', 'Background');
		statusControl.redraw();
		defectCodeControl.setEditable(true);
		defectCodeControl.setStyle('editableFields', 'Background');
		defectCodeControl.redraw();
		/*		defectCodeGroupControl.setEditable(true);
				defectCodeGroupControl.setStyle('editableFields', 'Background');
				defectCodeGroupControl.redraw();
				if (Object.keys(defectCodeGroup).length === 0) {
					defectCodeControl.setEditable(false);
					defectCodeControl.setStyle('nonEditableFields', 'Background');
					defectCodeControl.redraw();
				} else {
					defectCodeControl.setEditable(true);
					defectCodeControl.setStyle('editableFields', 'Background');
					defectCodeControl.redraw();
				}*/
	} else if (status === 'PASS') {
		statusControl.setStyle('statusColorPass', 'Background');
		statusControl.redraw();
		//B.O.A by RB for AM0001
		if (defectCodeGroupControl.getValue() === "") {
			//do nothing
		}
		else {
			defectCodeGroupControl.setValue("", false, true);
			defectCodeGroupControl.setEditable(false);
			defectCodeGroupControl.setStyle('nonEditableFields', 'Background');
			defectCodeGroupControl.redraw();
		}
		//E.O.A by RB for AM0001
		defectCodeControl.setValue('', false);
		defectCodeControl.setEditable(false);
		defectCodeControl.setStyle('nonEditableFields', 'Background');
		defectCodeControl.redraw();
	}

}