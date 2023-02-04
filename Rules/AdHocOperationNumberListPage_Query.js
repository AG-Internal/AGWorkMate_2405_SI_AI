export default function AdHocOperationNumberListPage_Query(context) {
	var binding = context.binding;
	let myListPageClientData = '';
	var query = '';

	try {
		myListPageClientData = context.evaluateTargetPath("#Page:WorkOrderDetailsPage/#ClientData");
	} catch (err) {}

	var operationNumbersOrig = myListPageClientData.OperationNumbersOrig;

	for (var i = 0; i < operationNumbersOrig.length; i++) {
		if (query === '') {
			query = "$filter=(OperationNumber eq '" + operationNumbersOrig[i].OperationNumber + "' and OperationShortText eq '" +
				operationNumbersOrig[i].OperationShortText + "')";
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
	return query;
}