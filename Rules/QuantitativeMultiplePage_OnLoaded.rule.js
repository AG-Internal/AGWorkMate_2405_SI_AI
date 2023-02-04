export default function QuantitativeMultiplePage_OnLoaded(clientAPI) {
	// Getting the controls
	var quantitativeReadingControl = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:QuantitativeReading');
	var statusControl = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:Status');
	var defectCodeGroupControl = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:DefectCodeGroup');
	var defectCodeControl = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:DefectCode');
	var page = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple');
	var pageToolbar = page.getToolbar();

	// Getting bound data
	var orderNumber = clientAPI.getPageProxy().getBindingObject().OrderNumber;
	var technicalObject = clientAPI.getPageProxy().getBindingObject().TechnicalObject;
	var fixedValuesResult = clientAPI.getPageProxy().getBindingObject().FixedValuesResult;
	var saveStatus = clientAPI.getPageProxy().getBindingObject().Status;
	var numberOfSamples = clientAPI.getPageProxy().getBindingObject().NumberOfSamples;
	var micDescopeType = clientAPI.getPageProxy().getBindingObject().MicDescopeType;

	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	var binding = clientAPI.getPageProxy().getBindingObject();
	pageClientData.InspCharBindingData = binding;

	// Bind only the defect code groups for the technical object
	var defectCode = clientAPI.getPageProxy().getBindingObject().DefectCode;
	var defectCodeGroup = clientAPI.getPageProxy().getBindingObject().DefectCodeGroup;
	defectCodeGroupControl.setEditable(false);
	defectCodeGroupControl.setStyle('nonEditableFields', 'Background');
	defectCodeGroupControl.setValue(defectCodeGroup, false);
	defectCodeGroupControl.redraw();
	defectCodeControl.setEditable(true);
	defectCodeControl.setStyle('editableFields', 'Background');
	defectCodeControl.setValue(defectCode, false);
	defectCodeControl.redraw();
	/*var containerProxyDefectCodeGroup = clientAPI.getControl('QuantitativeMultipleFormCellContainer');
	var defectCodeGroup = clientAPI.getPageProxy().getBindingObject().DefectCodeGroup;
	if (containerProxyDefectCodeGroup.isContainer()) {
		var listPickerProxyDefectCodeGroup = containerProxyDefectCodeGroup.getControl('DefectCodeGroup');
		var specifier = listPickerProxyDefectCodeGroup.getTargetSpecifier();
		specifier.setService("/SAPAssetManager/Services/SAM.service");
		specifier.setEntitySet("DefectCodeGroupSet");
		var queryOptions = "$filter=TechnicalObject eq '" + technicalObject + "'";
		specifier.setQueryOptions(queryOptions);
		specifier.setReturnValue("{DefCodeGroup}");
		listPickerProxyDefectCodeGroup.setTargetSpecifier(specifier);
		listPickerProxyDefectCodeGroup.setValue(defectCodeGroup, false);
	}

	// Bind only the defect codes for the defect code group
	if (defectCodeGroup === '') {
		defectCodeControl.setEditable(false);
		defectCodeControl.setStyle('nonEditableFields', 'Background');
		defectCodeControl.redraw();
	} else {
		defectCodeControl.setEditable(true);
		defectCodeControl.setStyle('', 'Background');
		defectCodeControl.redraw();
		var containerProxyDefectCode = clientAPI.getControl('QuantitativeMultipleFormCellContainer');
		var defectCode = clientAPI.getPageProxy().getBindingObject().DefectCode;
		if (containerProxyDefectCode.isContainer()) {
			var listPickerProxyDefectCode = containerProxyDefectCode.getControl('DefectCode');
			var specifier = listPickerProxyDefectCode.getTargetSpecifier();
			specifier.setService("/SAPAssetManager/Services/SAM.service");
			specifier.setEntitySet("DefectCodeSet");
			var queryOptions = "$filter=DefCodeGroup eq '" + defectCodeGroup + "'";
			specifier.setQueryOptions(queryOptions);
			specifier.setReturnValue("{DefCode}");
			listPickerProxyDefectCode.setTargetSpecifier(specifier);
			listPickerProxyDefectCode.setValue(defectCode, false);
		}
	}*/

	// Check the status values and set the status segmented button value and color 
	if (fixedValuesResult !== '') {
		var status = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:Status/#Value');

		if (Object.keys(status).length !== 0) {
			var statusSelectedValue = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:Status/#SelectedValue');

			if (statusSelectedValue === 'FAIL') {
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
			} else if (statusSelectedValue === 'FIX') {
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
			} else if (statusSelectedValue === 'PASS') {
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
			} else {
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
		}
	} else {
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

	// Making the sample readings visible based on the number of samples
	/*for (var i = 1; i <= numberOfSamples; i++) {
		var controlName = 'SampleReading' + i;
		var sampleReadingControl = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:' + controlName);
		sampleReadingControl.setVisible(true);
	}*/
	for (var i = numberOfSamples + 1; i <= 20; i++) {
		var controlName = 'SampleReading' + i;
		var sampleReadingControl = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:' + controlName);
		sampleReadingControl.setVisible(false);
	}

	// If the saveStatus is P, the entry has been permenantly saved
	// Disable all the controls
	if (saveStatus === 'P' || micDescopeType !== '') {
		quantitativeReadingControl.setEditable(false);
		quantitativeReadingControl.setStyle('nonEditableFields', 'Background');
		statusControl.setEditable(false);
		defectCodeGroupControl.setEditable(false);
		defectCodeGroupControl.setStyle('nonEditableFields', 'Background');
		defectCodeControl.setEditable(false);
		defectCodeControl.setStyle('nonEditableFields', 'Background');
		for (var i = 1; i <= numberOfSamples; i++) {
			var controlName1 = 'SampleReading' + i;
			var sampleReadingControl1 = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:' + controlName1);
			sampleReadingControl1.setEditable(false);
			sampleReadingControl1.setStyle('nonEditableFields', 'Background');
		}
		//clientAPI.setActionBarItemVisible(0, false);
		if (pageToolbar) {
			pageToolbar.then(function (toolbar) {
				var toolbarItems = toolbar.getToolbarItems();
				for (var i = 0; i < toolbarItems.length; i++) {
					toolbarItems[i].setEnabled(false);
				}
			});
		}
		return;
	}

	var techObjQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and TechnicalObject eq '" + technicalObject + "'";
	clientAPI.read('/SmartInspections/Services/SAM.service', 'TechnicalObjectDetailsSet', [], techObjQueryOptions).then(
		function (result) {
			if (result && result.length > 0) {
				result.forEach(function (value) {
					if ((value.Status === 'P' && fixedValuesResult !== '') || micDescopeType !== '') {
						quantitativeReadingControl.setEditable(false);
						quantitativeReadingControl.setStyle('nonEditableFields', 'Background');
						statusControl.setEditable(false);
						defectCodeGroupControl.setEditable(false);
						defectCodeGroupControl.setStyle('nonEditableFields', 'Background');
						defectCodeControl.setEditable(false);
						defectCodeControl.setStyle('nonEditableFields', 'Background');
						for (var i = 1; i <= numberOfSamples; i++) {
							var controlName1 = 'SampleReading' + i;
							var sampleReadingControl1 = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:' + controlName1);
							sampleReadingControl1.setEditable(false);
							sampleReadingControl1.setStyle('nonEditableFields', 'Background');
						}
						//clientAPI.setActionBarItemVisible(0, false);
						if (pageToolbar) {
							pageToolbar.then(function (toolbar) {
								var toolbarItems = toolbar.getToolbarItems();
								for (var i = 0; i < toolbarItems.length; i++) {
									toolbarItems[i].setEnabled(false);
								}
							});
						}
					}
				});
			}
		});
}