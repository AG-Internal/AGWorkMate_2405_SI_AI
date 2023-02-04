export default function NavToDescopedInspChar_ErrorMessage(clientAPI) {
	var clientData = '';
	var messageText = '';
	var decopeLevel = '';
	var descopeTypeDesc = '';
	try {
		clientData = clientAPI.evaluateTargetPath("#Page:InspectionHistory/#ClientData");
		descopeTypeDesc = clientData.DescopeTypeDesc;
		var descopeTypeDescUpper = descopeTypeDesc.toUpperCase();
		decopeLevel = clientData.DescopeLevel;
		if (decopeLevel === 'TO') {
			messageText = "Inspection descoped in technical object level due to " + descopeTypeDescUpper + ". No further information available";
		} else {
			messageText = "Inspection descoped in MIC level due to " + descopeTypeDescUpper + ". No further information available";
		}
	} catch (err) {}

	if (messageText === '') {
		messageText = "Inspection descoped";
	}
	return messageText;
}