export default function QualitativePFFPage_OnLoaded(clientAPI) {
	/*
	export default function NavToResultsRecording(context, controlProxy) {
	var orderNumber = context.getPageProxy().getBindingObject().OrderNumber;
	var technicalObject = context.getPageProxy().getBindingObject().TechnicalObject;
	var micNumber = context.getBindingObject().MicNumber;
	var inspectionCharacteristicNumb = context.getPageProxy().getBindingObject().InspectionCharacteristicNumb;
	*/

	// Getting the controls
	var statusControl = clientAPI.evaluateTargetPath('#Page:QualitativePFF/#Control:Status');
	var defectCodeGroupControl = clientAPI.evaluateTargetPath('#Page:QualitativePFF/#Control:DefectCodeGroup');
	var defectCodeControl = clientAPI.evaluateTargetPath('#Page:QualitativePFF/#Control:DefectCode');
	var page = clientAPI.evaluateTargetPath('#Page:QualitativePFF');
	var pageToolbar = page.getToolbar();

	// Getting bound data
	var orderNumber = clientAPI.getPageProxy().getBindingObject().OrderNumber;
	var technicalObject = clientAPI.getPageProxy().getBindingObject().TechnicalObject;
	var fixedValuesResult = clientAPI.getPageProxy().getBindingObject().FixedValuesResult;
	var saveStatus = clientAPI.getPageProxy().getBindingObject().Status;
	var micDescopeType = clientAPI.getPageProxy().getBindingObject().MicDescopeType;

	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	var binding = clientAPI.getPageProxy().getBindingObject();
	pageClientData.InspCharBindingData = binding;

	// Bind only the defect code groups for the technical object
	/*	var containerProxyDefectCodeGroup = clientAPI.getControl('QualitativePFFFormCellContainer');
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
		}*/

	// Bind only the defect codes for the defect code group
	//if (defectCodeGroup === '') {
	//	defectCodeControl.setEditable(false);
	//	defectCodeControl.setStyle('nonEditableFields', 'Background');
	//	defectCodeControl.redraw();
	//} else {
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
	/*	var containerProxyDefectCode = clientAPI.getControl('QualitativePFFFormCellContainer');
		var defectCode = clientAPI.getPageProxy().getBindingObject().DefectCode;
		if (containerProxyDefectCode.isContainer()) {
			var listPickerProxyDefectCode = containerProxyDefectCode.getControl('DefectCode');
			var specifier = listPickerProxyDefectCode.getTargetSpecifier();
			specifier.setService("/SAPAssetManager/Services/SAM.service");
			specifier.setEntitySet("DefectCodeSet");
			//var queryOptions = "$filter=DefCodeGroup eq '" + defectCodeGroup + "'";
			var queryOptions = "$filter=TechnicalObject eq '" + technicalObject + "'";
			specifier.setQueryOptions(queryOptions);
			//specifier.setReturnValue("{DefCode}");
			specifier.setReturnValue("{DefCode}");
			listPickerProxyDefectCode.setTargetSpecifier(specifier);
			listPickerProxyDefectCode.setValue(defectCode, false);
		}*/
	//}

	// Check the status values and set the status segmented button value and color 
	if (fixedValuesResult !== '') {
		var status = clientAPI.evaluateTargetPath('#Page:QualitativePFF/#Control:Status/#Value');

		if (Object.keys(status).length !== 0) {
			var statusSelectedValue = clientAPI.evaluateTargetPath('#Page:QualitativePFF/#Control:Status/#SelectedValue');

			if (statusSelectedValue === 'FAIL') {
				statusControl.setValue('FAIL', false);
				statusControl.setStyle('statusColorFail', 'Background');
				statusControl.setEditable(true);
				statusControl.redraw();
				defectCodeControl.setEditable(true);
				defectCodeControl.setStyle('editableFields', 'Background');
				defectCodeControl.redraw();
			} else if (statusSelectedValue === 'FIX') {
				statusControl.setValue('FIX', false);
				statusControl.setStyle('statusColorFix', 'Background');
				statusControl.setEditable(true);
				statusControl.redraw();
				defectCodeControl.setEditable(true);
				defectCodeControl.setStyle('editableFields', 'Background');
				defectCodeControl.redraw();
			} else if (statusSelectedValue === 'PASS') {
				statusControl.setValue('PASS', false);
				statusControl.setStyle('statusColorPass', 'Background');
				statusControl.setEditable(true);
				statusControl.redraw();
				defectCodeControl.setValue('', false);
				defectCodeControl.setEditable(false);
				defectCodeControl.setStyle('nonEditableFields', 'Background');
				defectCodeControl.redraw();
			} else {
				statusControl.setValue('', false);
				statusControl.setStyle('statusColorNeutral', 'Background');
				statusControl.setEditable(true);
				statusControl.redraw();
				defectCodeControl.setValue('', false);
				defectCodeControl.setEditable(false);
				defectCodeControl.setStyle('nonEditableFields', 'Background');
				defectCodeControl.redraw();
			}
		}
	} else {
		statusControl.setValue('', false);
		statusControl.setStyle('statusColorNeutral', 'Background');
		statusControl.setEditable(true);
		statusControl.redraw();
		defectCodeControl.setValue('', false);
		defectCodeControl.setEditable(false);
		defectCodeControl.setStyle('nonEditableFields', 'Background');
		defectCodeControl.redraw();
	}

	// If the saveStatus is P, the entry has been permenantly saved
	// Disable all the controls
	if (saveStatus === 'P' || micDescopeType !== '') {
		statusControl.setEditable(false);
		defectCodeControl.setEditable(false);
		defectCodeControl.setStyle('nonEditableFields', 'Background');
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
						statusControl.setEditable(false);
						defectCodeControl.setEditable(false);
						defectCodeControl.setStyle('nonEditableFields', 'Background');
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