export default function QualitativeYNReading_OnValueChange(clientAPI) {
	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	pageClientData.DataChanged = 'X';

	// Getting the controls
	var statusControl = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:Status');
	var defectCodeGroupControl = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:DefectCodeGroup');
	var defectCodeControl = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:DefectCode');

	// Getting the values
	//var defectCodeGroup = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:DefectCodeGroup/#Value');
	var qualitativeReading = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:QualitativeReading/#Value');

	/*
	//const keys = Object.keys(dd);
	//const values = Object.values(dd);
	//const entries = Object.entries(dd);
	//alert(entries);
	//const entries_2 = Object.entries(dd.DisplayValue)
	//const entries_3 = Object.entries(qualitativeReadingControl._model._model.data.PickerItems);
	//const entries_4 = Object.entries(listPickerProxyDefectCode);
	*/

	if (Object.keys(qualitativeReading).length !== 0) {
		var codeValuation = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:QualitativeReading/#Value')[0].DisplayValue.StatusText;
		// Updating the status based on the qualitative reading
		if (codeValuation === 'A') {
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
		} else if (codeValuation === 'F') {
			statusControl.setValue('FIX', false);
			statusControl.setStyle('statusColorFix', 'Background');
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
		} else if (codeValuation === 'R') {
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
		}
	} else {
		statusControl.setValue('', false);
		statusControl.setStyle('statusColorNeutral', 'Background');
		statusControl.setEditable(false);
		statusControl.redraw();
		//defectCodeGroupControl.setValue('', false);
		//defectCodeGroupControl.setEditable(false);
		//defectCodeGroupControl.setStyle('nonEditableFields', 'Background');
		//defectCodeGroupControl.redraw();
		defectCodeControl.setValue('', false);
		defectCodeControl.setEditable(false);
		defectCodeControl.setStyle('nonEditableFields', 'Background');
		defectCodeControl.redraw();
	}
}