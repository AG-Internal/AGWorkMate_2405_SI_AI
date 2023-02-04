export default class {

	static QualitativeDatePage_OnLoaded(clientAPI) {
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

		if (fixedValuesResult !== '') {
			return;
		}

		// If the saveStatus is P, the entry has been permenantly saved
		// Disable all the controls
		if (micDescopeType !== '') {
			qualitativeReadingControl.setEditable(false);
			qualitativeReadingControl.setStyle('nonEditableFields', 'Background');
			statusControl.setEditable(false);
			if (pageToolbar) {
				pageToolbar.then(function (toolbar) {
					var toolbarItems = toolbar.getToolbarItems();
					for (var i = 0; i < toolbarItems.length; i++) {
						toolbarItems[i].setEnabled(false);
					}
				});
			}
			return;
		} else if (micDescopeType === '') {
			qualitativeReadingControl.setEditable(true);
			qualitativeReadingControl.setStyle('editableFields', 'Background');
			statusControl.setEditable(true);
			if (pageToolbar) {
				pageToolbar.then(function (toolbar) {
					var toolbarItems = toolbar.getToolbarItems();
					for (var i = 0; i < toolbarItems.length; i++) {
						toolbarItems[i].setEnabled(true);
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
						if (micDescopeType !== '') {
							qualitativeReadingControl.setEditable(false);
							qualitativeReadingControl.setStyle('nonEditableFields', 'Background');
							statusControl.setEditable(false);
							if (pageToolbar) {
								pageToolbar.then(function (toolbar) {
									var toolbarItems = toolbar.getToolbarItems();
									for (var i = 0; i < toolbarItems.length; i++) {
										toolbarItems[i].setEnabled(false);
									}
								});
							}
						} else if (micDescopeType === '') {
							qualitativeReadingControl.setEditable(true);
							qualitativeReadingControl.setStyle('editableFields', 'Background');
							statusControl.setEditable(true);
							if (pageToolbar) {
								pageToolbar.then(function (toolbar) {
									var toolbarItems = toolbar.getToolbarItems();
									for (var i = 0; i < toolbarItems.length; i++) {
										toolbarItems[i].setEnabled(true);
									}
								});
							}
						}
					});
				}
			});
	}

	static QualitativePFFPage_OnLoaded(clientAPI) {
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

		var defectCode = clientAPI.getPageProxy().getBindingObject().DefectCode;
		var defectCodeGroup = clientAPI.getPageProxy().getBindingObject().DefectCodeGroup;

		if (fixedValuesResult !== '') {
			return;
		}

		// If the saveStatus is P, the entry has been permenantly saved
		// Disable all the controls
		if (micDescopeType !== '') {
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
		} else if (micDescopeType === '') {
			statusControl.setEditable(true);
			defectCodeControl.setEditable(false);
			defectCodeControl.setStyle('nonEditableFields', 'Background');
			if (pageToolbar) {
				pageToolbar.then(function (toolbar) {
					var toolbarItems = toolbar.getToolbarItems();
					for (var i = 0; i < toolbarItems.length; i++) {
						toolbarItems[i].setEnabled(true);
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
						if (micDescopeType !== '') {
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
						} else if (micDescopeType === '') {
							statusControl.setEditable(true);
							defectCodeControl.setEditable(false);
							defectCodeControl.setStyle('nonEditableFields', 'Background');
							if (pageToolbar) {
								pageToolbar.then(function (toolbar) {
									var toolbarItems = toolbar.getToolbarItems();
									for (var i = 0; i < toolbarItems.length; i++) {
										toolbarItems[i].setEnabled(true);
									}
								});
							}
						}
					});
				}
			});
	}

	static QualitativeYNPage_OnLoaded(clientAPI) {
		// Getting the controls
		var qualitativeReadingControl = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:QualitativeReading');
		var statusControl = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:Status');
		var defectCodeGroupControl = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:DefectCodeGroup');
		var defectCodeControl = clientAPI.evaluateTargetPath('#Page:QualitativeYN/#Control:DefectCode');
		var page = clientAPI.evaluateTargetPath('#Page:QualitativeYN');
		var pageToolbar = page.getToolbar();

		// Getting bound data
		var orderNumber = clientAPI.getPageProxy().getBindingObject().OrderNumber;
		var technicalObject = clientAPI.getPageProxy().getBindingObject().TechnicalObject;
		var micNumber = clientAPI.getPageProxy().getBindingObject().MicNumber;
		var fixedValuesResult = clientAPI.getPageProxy().getBindingObject().FixedValuesResult;
		var saveStatus = clientAPI.getPageProxy().getBindingObject().Status;
		var micDescopeType = clientAPI.getPageProxy().getBindingObject().MicDescopeType;

		let pageProxy = clientAPI.getPageProxy();
		let pageClientData = pageProxy.getClientData();
		var binding = clientAPI.getPageProxy().getBindingObject();
		pageClientData.InspCharBindingData = binding;

		// Bind only the defect code groups for the technical object
		var defectCode = clientAPI.getPageProxy().getBindingObject().DefectCode;
		var defectCodeGroup = clientAPI.getPageProxy().getBindingObject().DefectCodeGroup;
		
		if (fixedValuesResult !== '') {
			return;
		}

		// If the saveStatus is P, the entry has been permenantly saved
		// Disable all the controls
		if (micDescopeType !== '') {
			qualitativeReadingControl.setEditable(false);
			qualitativeReadingControl.setStyle('nonEditableFields', 'Background');
			statusControl.setEditable(false);
			defectCodeGroupControl.setEditable(false);
			defectCodeGroupControl.setStyle('nonEditableFields', 'Background');
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
		} else if (micDescopeType === '') {
			qualitativeReadingControl.setEditable(true);
			qualitativeReadingControl.setStyle('editableFields', 'Background');
			statusControl.setEditable(false);
			defectCodeGroupControl.setEditable(false);
			defectCodeGroupControl.setStyle('nonEditableFields', 'Background');
			defectCodeControl.setEditable(false);
			defectCodeControl.setStyle('nonEditableFields', 'Background');
			if (pageToolbar) {
				pageToolbar.then(function (toolbar) {
					var toolbarItems = toolbar.getToolbarItems();
					for (var i = 0; i < toolbarItems.length; i++) {
						toolbarItems[i].setEnabled(true);
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
						if (micDescopeType !== '') {
							qualitativeReadingControl.setEditable(false);
							qualitativeReadingControl.setStyle('nonEditableFields', 'Background');
							statusControl.setEditable(false);
							defectCodeGroupControl.setEditable(false);
							defectCodeGroupControl.setStyle('nonEditableFields', 'Background');
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
						} else if (micDescopeType === '') {
							qualitativeReadingControl.setEditable(true);
							qualitativeReadingControl.setStyle('editableFields', 'Background');
							statusControl.setEditable(false);
							defectCodeGroupControl.setEditable(false);
							defectCodeGroupControl.setStyle('nonEditableFields', 'Background');
							defectCodeControl.setEditable(false);
							defectCodeControl.setStyle('nonEditableFields', 'Background');
							if (pageToolbar) {
								pageToolbar.then(function (toolbar) {
									var toolbarItems = toolbar.getToolbarItems();
									for (var i = 0; i < toolbarItems.length; i++) {
										toolbarItems[i].setEnabled(true);
									}
								});
							}
						}
					});
				}
			});
	}

	static QuantitativePage_OnLoaded(clientAPI) {
		// Getting the controls
		var quantitativeReadingControl = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:QuantitativeReading');
		var statusControl = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:Status');
		var defectCodeGroupControl = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:DefectCodeGroup');
		var defectCodeControl = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:DefectCode');
		var defectCodeControl = clientAPI.evaluateTargetPath('#Page:Quantitative/#Control:DefectCode')
		var page = clientAPI.evaluateTargetPath('#Page:Quantitative');
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
		var defectCode = clientAPI.getPageProxy().getBindingObject().DefectCode;
		var defectCodeGroup = clientAPI.getPageProxy().getBindingObject().DefectCodeGroup;

		if (fixedValuesResult !== '') {
			return;
		}

		// If the saveStatus is P, the entry has been permenantly saved
		// Disable all the controls
		if (micDescopeType !== '') {
			quantitativeReadingControl.setEditable(false);
			quantitativeReadingControl.setStyle('nonEditableFields', 'Background');
			statusControl.setEditable(false);
			defectCodeGroupControl.setEditable(false);
			defectCodeGroupControl.setStyle('nonEditableFields', 'Background');
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
		} else if (micDescopeType === '') {
			quantitativeReadingControl.setEditable(true);
			quantitativeReadingControl.setStyle('editableFields', 'Background');
			statusControl.setEditable(false);
			defectCodeGroupControl.setEditable(false);
			defectCodeGroupControl.setStyle('nonEditableFields', 'Background');
			defectCodeControl.setEditable(false);
			defectCodeControl.setStyle('nonEditableFields', 'Background');
			if (pageToolbar) {
				pageToolbar.then(function (toolbar) {
					var toolbarItems = toolbar.getToolbarItems();
					for (var i = 0; i < toolbarItems.length; i++) {
						toolbarItems[i].setEnabled(true);
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
						if (micDescopeType !== '') {
							quantitativeReadingControl.setEditable(false);
							quantitativeReadingControl.setStyle('nonEditableFields', 'Background');
							statusControl.setEditable(false);
							defectCodeGroupControl.setEditable(false);
							defectCodeGroupControl.setStyle('nonEditableFields', 'Background');
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
						} else if (micDescopeType === '') {
							quantitativeReadingControl.setEditable(true);
							quantitativeReadingControl.setStyle('editableFields', 'Background');
							statusControl.setEditable(false);
							defectCodeGroupControl.setEditable(false);
							defectCodeGroupControl.setStyle('nonEditableFields', 'Background');
							defectCodeControl.setEditable(false);
							defectCodeControl.setStyle('nonEditableFields', 'Background');
							if (pageToolbar) {
								pageToolbar.then(function (toolbar) {
									var toolbarItems = toolbar.getToolbarItems();
									for (var i = 0; i < toolbarItems.length; i++) {
										toolbarItems[i].setEnabled(true);
									}
								});
							}
						}
					});
				}
			});
	}

	static QuantitativeMultiplePage_OnLoaded(clientAPI) {
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

		if (fixedValuesResult !== '') {
			return;
		}

		for (var i = numberOfSamples + 1; i <= 20; i++) {
			var controlName = 'SampleReading' + i;
			var sampleReadingControl = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:' + controlName);
			sampleReadingControl.setVisible(false);
		}

		// If the saveStatus is P, the entry has been permenantly saved
		// Disable all the controls
		if (micDescopeType !== '') {
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
		} else if (micDescopeType === '') {
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
				sampleReadingControl1.setEditable(true);
				sampleReadingControl1.setStyle('editableFields', 'Background');
			}
			if (pageToolbar) {
				pageToolbar.then(function (toolbar) {
					var toolbarItems = toolbar.getToolbarItems();
					for (var i = 0; i < toolbarItems.length; i++) {
						toolbarItems[i].setEnabled(true);
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
						if (micDescopeType !== '') {
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
						} else if (micDescopeType === '') {
							quantitativeReadingControl.setEditable(false);
							quantitativeReadingControl.setStyle('editableFields', 'Background');
							statusControl.setEditable(false);
							defectCodeGroupControl.setEditable(false);
							defectCodeGroupControl.setStyle('nonEditableFields', 'Background');
							defectCodeControl.setEditable(false);
							defectCodeControl.setStyle('nonEditableFields', 'Background');
							for (var i = 1; i <= numberOfSamples; i++) {
								var controlName1 = 'SampleReading' + i;
								var sampleReadingControl1 = clientAPI.evaluateTargetPath('#Page:QuantitativeMultiple/#Control:' + controlName1);
								sampleReadingControl1.setEditable(true);
								sampleReadingControl1.setStyle('editableFields', 'Background');
							}
							//clientAPI.setActionBarItemVisible(0, true);
							if (pageToolbar) {
								pageToolbar.then(function (toolbar) {
									var toolbarItems = toolbar.getToolbarItems();
									for (var i = 0; i < toolbarItems.length; i++) {
										toolbarItems[i].setEnabled(true);
									}
								});
							}
						}
					});
				}
			});
	}

}