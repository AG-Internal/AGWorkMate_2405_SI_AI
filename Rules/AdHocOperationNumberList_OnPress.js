export default function AdHocOperationNumberList_OnPress(clientAPI) {
	var binding = clientAPI.getPageProxy().getActionBinding();
	var operationNumber = binding.OperationNumber;
	var operationShortText = binding.OperationShortText;
	var nodeNumber = binding.NodeNumber;
	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();

	pageClientData.AdHocNodeNumber = nodeNumber;
	pageClientData.AdHocOperationNumber = operationNumber;
	pageClientData.AdHocOperationShortText = operationShortText;

	return clientAPI.executeAction('/SmartInspections/Actions/AdHocConfirmation_Message.action');
}