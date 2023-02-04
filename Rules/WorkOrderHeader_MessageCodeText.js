export default function WorkOrderHeader_MessageCodeText(clientAPI) {
	var clientData = '';
	var messageCodeText = '';
	try {
		clientData = clientAPI.evaluateTargetPath("#Page:WorkOrderDetailsPage/#ClientData");
		messageCodeText = clientData.SelectedOrderOrig.MessageCodeText;
	} catch (err) {}
	return messageCodeText;
}