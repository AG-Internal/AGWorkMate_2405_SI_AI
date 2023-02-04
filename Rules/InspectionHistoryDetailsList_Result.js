export default function InspectionHistoryDetailsList_Result(sectionedTableProxy) {
	var binding = sectionedTableProxy.binding;
	var micType = binding.MicType;
	var dateResult = binding.DateResult;
	var result = binding.Result;

	if (micType === '05') {
		dateResult = dateResult.toString();
		dateResult = dateResult.split('T');
		return dateResult[0];
	} else {
		return result;
	}
}