export default function HistoryDetails_MessageCodeText(clientAPI) {
	var clientData = '';
	var messageCodeText = '';
	try {
		clientData = clientAPI.evaluateTargetPath("#Page:EquipmentDetailsPage/#ClientData");
		messageCodeText = clientData.SelectedHistoryObject.MessageCodeText;
	} catch (err) {}
	try {
		clientData = clientAPI.evaluateTargetPath("#Page:FunctionalLocationDetails/#ClientData");
		messageCodeText = clientData.SelectedHistoryObject.MessageCodeText;
	} catch (err) {}
	try {
		clientData = clientAPI.evaluateTargetPath("#Page:WorkOrderDetailsPage/#ClientData");
		messageCodeText = clientData.SelectedHistoryObject.MessageCodeText;
	} catch (err) {}
	return messageCodeText;
}