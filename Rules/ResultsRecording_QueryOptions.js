export default function ResultsRecording_QueryOptions(clientAPI) {
	let histClientData = '';
	var queryOptions = '';
	var navFromHistory = '';

	try {
		histClientData = clientAPI.evaluateTargetPath("#Page:InspectionHistory/#ClientData");
		navFromHistory = histClientData.navFromHistory;
	} catch (err) {}
	if (navFromHistory === 'X') {
		queryOptions =
			"$filter=OrderNumber eq '{{#Property:OrderNumber}}' and TechnicalObject eq '{{#Property:TechnicalObject}}' and InspectionCharacteristicNumb eq '{{#Property:InspectionCharacteristicNumb}}' and MicNumber eq '{{#Property:MicNumber}}' and NodeNumber eq '{{#Property:NodeNumber}}'";
	} else {
		queryOptions =
			"$filter=OrderNumber eq '{{#Property:OrderNumber}}' and TechnicalObject eq '{{#Property:TechnicalObject}}' and InspectionSampleNumber eq '{{#Property:InspectionSampleNumber}}' and OperationNumber eq '{{#Property:OperationNumber}}' and InspectionCharacteristicNumb eq '{{#Property:InspectionCharacteristicNumb}}' and MicNumber eq '{{#Property:MicNumber}}'";
	}
	return queryOptions;
}