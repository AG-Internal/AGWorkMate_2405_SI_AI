export default function WorkOrderHeader_MessageText(clientAPI) {
	var clientData = '';
	var messageText = '';
	try {
		clientData = clientAPI.evaluateTargetPath("#Page:WorkOrderDetailsPage/#ClientData");
		messageText = clientData.SelectedOrderOrig.MessageText;
	} catch (err) {}
	return messageText;
}