/* Change Tag : SIV2203, Date:1-Nov-22, Description: EX Group, 
Changes: EX Related Logic
*/
export default function InspectionCharacteristicDetailsPage_PendingCount(context) {
	var binding = context.binding;
	var orderNumber = binding.OrderNumber;
	var technicalObject = binding.TechnicalObject;
	var descopeType = binding.DescopeType;
	var inspectionType = binding.InspectionType;

	// var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and TechnicalObject eq '" + technicalObject + "'";//Commented for SIV2203
	/*B.O.A by RB for SIV2203*/
	var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and TechnicalObject eq '" + technicalObject + "'" +
		" and DeleteFromWoSnap eq false";
	/*E.O.A by RB for SIV2203*/
	if (descopeType !== '') {
		return "Pending: 0";
	}

	return context.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet', [], inspCharQueryOptions).then(
		function (results) {
			var totalPending = 0;
			if (results && results.length > 0) {
				results.forEach(function (value) {
					if (value.InspectionTypes !== '') {
						var inspectionTypes = value.InspectionTypes.split(",");
						if (value.FixedValuesResult === '' && (inspectionTypes.includes(inspectionType) || inspectionType === '') && value.MicDescopeType ===
							'') {
							totalPending = totalPending + 1;
						}
					} else {
						if (value.FixedValuesResult === '' && inspectionType === '' && value.MicDescopeType === '') {
							totalPending = totalPending + 1;
						}
					}
				});
				return "Pending: " + totalPending;
			} else {
				return "Pending: " + totalPending;
			}
		});
}