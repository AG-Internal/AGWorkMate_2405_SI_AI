export default function TechnicalObjectDetailsListPage_Status(sectionedTableProxy) {
	var binding = sectionedTableProxy.binding;
	//var orderNumber = binding.OrderNumber;
	//var technicalObject = binding.TechnicalObject;
	var techStatus = binding.Status;
	//var saveMode = binding.SaveMode;
	//var technicalObject = binding.TechnicalObject;
	//var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and TechnicalObject eq '" + technicalObject + "'";

	var status = '';
	if (techStatus === 'P') { // || (saveMode === 'SAVE' && value.FixedValuesResult !== '')) {
		status = 'P'
	}
	return status;

	/*return sectionedTableProxy.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet', [], inspCharQueryOptions).then(
		function (results) {
			var status = '';
			if (results && results.length > 0) {
				results.forEach(function (value) {
					if (techStatus === 'P') { // || (saveMode === 'SAVE' && value.FixedValuesResult !== '')) {
						status = 'P'
					}
				});
				return status;
			} else {
				return status;
			}
		});*/
}