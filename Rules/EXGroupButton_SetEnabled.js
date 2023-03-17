/**Change Tag : SIV2203, Date:1-Nov-22, Description: EX Group, 
New Rule
Enable the EX Group Button on below conditions
1. When it is Active at orderl level
2. Order Not closed
3. When No Results are recorded for the Tech object
 */
export default function EXGroupButton_SetEnabled(clientAPI) {

	var binding = clientAPI.getPageProxy().binding;
	var orderNumber = binding.OrderNumber;
	var technicalObject = binding.TechnicalObject;
	var descopeType = binding.DescopeType;

	if (descopeType !== '') {
		return false;
	}

	var workOrderQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and EXActive eq 'X' and CloseOrder ne 'X'";
	let countWorkOrderPromise = clientAPI.count('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet', workOrderQueryOptions);

	var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and TechnicalObject eq '" + technicalObject +
		"' and ( FixedValuesResult ne '' or MicDescopeType ne '' )"; // Added MicDescopeType for T019
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