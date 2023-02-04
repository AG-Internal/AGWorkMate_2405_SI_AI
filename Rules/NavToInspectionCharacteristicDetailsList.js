export default function NavToInspectionCharacteristicDetailsList(clientAPI) {
	var binding = clientAPI.getPageProxy().getActionBinding();
	let pageClientData = clientAPI.getPageProxy().getClientData();
	pageClientData.NavigatedTechObject = binding;

	return clientAPI.executeAction('/SmartInspections/Actions/NavToInspectionCharacteristicDetailsList.action');
}