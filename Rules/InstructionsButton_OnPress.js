export default function InstructionsButton_OnPress(clientAPI) {
	return clientAPI.executeAction('/SmartInspections/Actions/NavToInstructions.action');
}