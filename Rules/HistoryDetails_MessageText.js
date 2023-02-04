export default function HistoryDetails_MessageText(clientAPI) {
	var clientData = '';
	var messageText = '';
	try {
		clientData = clientAPI.evaluateTargetPath("#Page:EquipmentDetailsPage/#ClientData");
		messageText = clientData.SelectedHistoryObject.MessageText;
	} catch (err) {}
	try {
		clientData = clientAPI.evaluateTargetPath("#Page:FunctionalLocationDetails/#ClientData");
		messageText = clientData.SelectedHistoryObject.MessageText;
	} catch (err) {}
	try {
		clientData = clientAPI.evaluateTargetPath("#Page:WorkOrderDetailsPage/#ClientData");
		messageText = clientData.SelectedHistoryObject.MessageText;
	} catch (err) {}
	return messageText;
}