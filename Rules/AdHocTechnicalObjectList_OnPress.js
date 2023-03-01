/*--------------------------------------------------------------------*
* Change Tag    :  D062 - Catalog Profile for ADHOC
*--------------------------------------------------------------------*/

export default function AdHocTechnicalObjectList_OnPress(clientAPI) {
	var binding = clientAPI.getPageProxy().getActionBinding();
	var technicalObject = binding.TechnicalObject;
	var technicalObjectDesc = binding.TechnicalObjectDesc;
	var functionalLocation = binding.FunctionalLocation;
	var equipmentNumber = binding.EquipmentNumber;
	var CatalogProfile = binding.CatalogProfile;//++ for D062
	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	var operationNumber = '';

	//var indicatorId = pageProxy.showActivityIndicator('Saving in-progress...');

	pageClientData.AdHocTechnicalObject = technicalObject;
	pageClientData.AdHocTechnicalObjectDesc = technicalObjectDesc;
	pageClientData.AdHocEquipmentNumber = equipmentNumber;
	pageClientData.AdHocFunctionalLocation = functionalLocation;
	pageClientData.CatalogProfile = CatalogProfile;//++ for D062

	let myListPageClientData = '';
	var query = '';

	try {
		myListPageClientData = clientAPI.evaluateTargetPath("#Page:WorkOrderDetailsPage/#ClientData");
	} catch (err) {}

	var operationNumbersOrig = myListPageClientData.OperationNumbersOrig;

	for (var i = 0; i < operationNumbersOrig.length; i++) {
		if (query === '') {
			query = "$filter=(OperationNumber eq '" + operationNumbersOrig[i].OperationNumber + "' and OperationShortText eq '" +
				operationNumbersOrig[i].OperationShortText + "')";
			operationNumber = operationNumbersOrig[i].OperationNumber;
		} else {
			query = query + " or (OperationNumber eq '" + operationNumbersOrig[i].OperationNumber + "' and OperationShortText eq '" +
				operationNumbersOrig[i].OperationShortText + "')";
		}
	}
	if (query === '') {
		query = "$filter=OperationNumber eq 'NO_OPERATION'";
	} else {
		query = query + "&$orderby=OperationNumber";
	}

	var operationListPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'AdHocOperationNumberDetailsSet', [],
		query).then(
		function (results) {
			pageClientData.OperationList = [];
			if (results && results.length > 0) {
				results.forEach(function (value) {
					pageClientData.AdHocNodeNumber = value.NodeNumber;
					pageClientData.AdHocOperationNumber = value.OperationNumber;
					pageClientData.AdHocOperationShortText = value.OperationShortText;
					pageClientData.OperationList.push(value.OperationNumber);
				});
			}
			return pageClientData.OperationList;
		});

	return Promise.all([operationListPromise]).then(function (counts) {
		let operationCount = pageClientData.OperationList.length;

		if (operationCount === 0) {
			return clientAPI.executeAction('/SmartInspections/Actions/AdHocNoOperation_Message.action');
		} else if (operationCount === 1) {
			return clientAPI.executeAction('/SmartInspections/Actions/AdHocConfirmation_Message.action');
		} else {
			return clientAPI.executeAction('/SmartInspections/Actions/NavToAdHocOperationNumberList.action');
		}
	});

}