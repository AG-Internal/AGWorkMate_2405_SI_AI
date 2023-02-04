export default function AddTechnicalObjectButton_SetEnabled(clientAPI) {
	var binding = clientAPI.getPageProxy().binding;
	var orderNumber = binding.OrderId;

	var workOrderQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and AdvancedInspActive eq 'X'";
	let countWorkOrderPromise = clientAPI.count('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet', workOrderQueryOptions);

	return Promise.all([countWorkOrderPromise]).then(function (counts) {
		let countWorkOrder = counts[0];

		if (countWorkOrder > 0) {
			return true;
		} else {
			return false;
		}
	});
}