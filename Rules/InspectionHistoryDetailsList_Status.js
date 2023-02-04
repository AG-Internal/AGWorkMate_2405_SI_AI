export default function InspectionHistoryDetailsList_Status(sectionedTableProxy) {
	var binding = sectionedTableProxy.binding;
	var fixedValuesResult = binding.FixedValuesResult;
	var isDescoped = binding.IsDescoped;
	var status = '';

	if (fixedValuesResult !== '') {
		status = fixedValuesResult;
	} else {
		if (isDescoped === true) {
			status = 'DESCOPED'
		}
	}
	return status;
}