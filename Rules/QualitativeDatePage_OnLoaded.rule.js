export default function QualitativeDatePage_OnLoaded(clientAPI) {
	// Getting the controls
	var qualitativeReadingControl = clientAPI.evaluateTargetPath('#Page:QualitativeDate/#Control:QualitativeReading');
	var statusControl = clientAPI.evaluateTargetPath('#Page:QualitativeDate/#Control:Status');
	var page = clientAPI.evaluateTargetPath('#Page:QualitativeDate');
	var pageToolbar = page.getToolbar();

	// Getting bound data
	var orderNumber = clientAPI.getPageProxy().getBindingObject().OrderNumber;
	var technicalObject = clientAPI.getPageProxy().getBindingObject().TechnicalObject;
	var fixedValuesResult = clientAPI.getPageProxy().getBindingObject().FixedValuesResult;
	var saveStatus = clientAPI.getPageProxy().getBindingObject().Status;
	var dateResult = clientAPI.getPageProxy().getBindingObject().DateResult;
	var micDescopeType = clientAPI.getPageProxy().getBindingObject().MicDescopeType;

	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	var binding = clientAPI.getPageProxy().getBindingObject();
	pageClientData.InspCharBindingData = binding;

	// Updating the status based on the qualitative reading
	if (dateResult === '') {
		qualitativeReadingControl.setValue('', false);
	}

	// Check the status values and set the status segmented button value and color 
	if (fixedValuesResult !== '') {
		var status = clientAPI.evaluateTargetPath('#Page:QualitativeDate/#Control:Status/#Value');

		if (Object.keys(status).length !== 0) {
			var statusSelectedValue = clientAPI.evaluateTargetPath('#Page:QualitativeDate/#Control:Status/#SelectedValue');

			if (statusSelectedValue === 'FAIL') {
				statusControl.setStyle('statusColorFail', 'Background');
				statusControl.redraw();
			} else if (statusSelectedValue === 'FIX') {
				statusControl.setStyle('statusColorFix', 'Background');
				statusControl.redraw();
			} else if (statusSelectedValue === 'PASS') {
				statusControl.setStyle('statusColorPass', 'Background');
				statusControl.redraw();
			} else {
				statusControl.setStyle('statusColorNeutral', 'Background');
				statusControl.redraw();
			}
		}
	} else {
		statusControl.setStyle('statusColorNeutral', 'Background');
		statusControl.redraw();
	}

	// If the saveStatus is P, the entry has been permenantly saved
	// Disable all the controls
	if (saveStatus === 'P' || micDescopeType !== '') {
		qualitativeReadingControl.setEditable(false);
		qualitativeReadingControl.setStyle('nonEditableFields', 'Background');
		statusControl.setEditable(false);
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
						qualitativeReadingControl.setEditable(false);
						qualitativeReadingControl.setStyle('nonEditableFields', 'Background');
						statusControl.setEditable(false);
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