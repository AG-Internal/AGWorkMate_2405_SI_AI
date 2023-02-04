export default function InspectionHistoryDetailsList_Footnote(sectionedTableProxy) {
	var binding = sectionedTableProxy.binding;
	var orderNumber = binding.OrderNumber;
	var resultRecDate = binding.ResultRecDate;
	var inspectionTypeDesc = binding.InspectionTypeDesc;
	var isDescoped = binding.IsDescoped;
	var descopedOn = binding.DescopedOn;
	var inspectionTypeDescUp = inspectionTypeDesc.toUpperCase()

	if (isDescoped === true) {
		descopedOn = descopedOn.toString();
		descopedOn = descopedOn.split('T');
		if (inspectionTypeDescUp) {
			return orderNumber + ' (' + descopedOn[0] + ') - ' + inspectionTypeDescUp;
		} else {
			return orderNumber + ' (' + descopedOn[0] + ')';
		}
	} else if (resultRecDate) {
		resultRecDate = resultRecDate.toString();
		resultRecDate = resultRecDate.split('T');
		if (inspectionTypeDescUp) {
			return orderNumber + ' (' + resultRecDate[0] + ') - ' + inspectionTypeDescUp;
		} else {
			return orderNumber + ' (' + resultRecDate[0] + ')';
		}
	} else {
		if (inspectionTypeDescUp) {
			return orderNumber + ' - ' + inspectionTypeDescUp;
		} else {
			return orderNumber;
		}
	}
}