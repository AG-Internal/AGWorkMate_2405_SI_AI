export default function TechObjAndInspCharListPage_RecordingStatus(sectionedTableProxy) {
	var binding = sectionedTableProxy.binding;
	var orderNumber = binding.OrderNumber;
	var technicalObject = binding.TechnicalObject;
	var fixedValuesResult = binding.FixedValuesResult;
	var inspectionSampleNumber = binding.InspectionSampleNumber;
	var micDescopeType = binding.MicDescopeType;
	var status = binding.Status;
	var techObjQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and TechnicalObject eq '" + technicalObject +
		"' and InspectionSampleNumber eq '" + inspectionSampleNumber + "'";

	return sectionedTableProxy.read('/SmartInspections/Services/SAM.service', 'TechnicalObjectDetailsSet', [], techObjQueryOptions).then(
		function (results) {
			var recStatus = '';
			if (results && results.length > 0) {
				results.forEach(function (value) {
					if (status == 'P' || value.Status === 'P') { // || (value.SaveMode === 'SAVE' && fixedValuesResult !== '')) {
						recStatus = 'P';
					} else if (micDescopeType !== '') {
						recStatus = 'T';
					} else if (fixedValuesResult == '') {
						recStatus = 'N';
					} else if (fixedValuesResult != '' || status == 'T') {
						recStatus = 'T';
					} else {
						recStatus = 'N';
					}
				});
				return recStatus;
			} else {
				return recStatus;
			}
		});
}