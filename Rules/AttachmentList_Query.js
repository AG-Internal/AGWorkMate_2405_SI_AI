export default function AttachmentList_Query(context) {
	var binding = context.binding;
	var orderNumber = binding.OrderNumber;
	var nodeNumber = binding.NodeNumber;
	var micNumber = binding.MicNumber;
	var inspectionSampleNumber = binding.InspectionSampleNumber;
	var multipleSample = binding.MultipleSample;
	var inspectionCharacteristicNumb = binding.InspectionCharacteristicNumb;
	var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and NodeNumber eq '" + nodeNumber +
		"' and InspectionSampleNumber eq '" + inspectionSampleNumber + "' and MicNumber eq '" + micNumber +
		"' and InspectionCharacteristicNumb eq '" + inspectionCharacteristicNumb + "' and MultipleSample eq '" + multipleSample + "'";
	return inspCharQueryOptions;
}