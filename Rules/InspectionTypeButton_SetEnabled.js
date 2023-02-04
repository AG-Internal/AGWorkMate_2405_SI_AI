export default function InspectionTypeButton_SetEnabled(clientAPI) {
	var binding = clientAPI.getPageProxy().binding;
	var orderNumber = binding.OrderNumber;
	var technicalObject = binding.TechnicalObject;
	var descopeType = binding.DescopeType;

	if (descopeType !== '') {
		return false;
	}

	var workOrderQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and CascadedActive eq 'X' and CloseOrder ne 'X'";
	let countWorkOrderPromise = clientAPI.count('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet', workOrderQueryOptions);

	var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and TechnicalObject eq '" + technicalObject +
		"' and FixedValuesResult ne ''";
	let countInspCharPromise = clientAPI.count('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet',
		inspCharQueryOptions);

	return Promise.all([countWorkOrderPromise, countInspCharPromise]).then(function (counts) {
		let countWorkOrder = counts[0];
		let countInspChar = counts[1];

		if (countWorkOrder > 0 && countInspChar == 0) {
			return true;
		} else {
			return false;
		}
	});
}