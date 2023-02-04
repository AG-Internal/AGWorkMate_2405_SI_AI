export default function TechObjAndInspCharListPage_StatusIcon(sectionedTableProxy) {

	var binding = sectionedTableProxy.binding;
	var fixedValuesResult = binding.FixedValuesResult;
	var micDescopeType = binding.MicDescopeType;
	var longText = binding.LongText;
	var iconImage = [];
	var longTextLines = '';
	var longTextArray = longText.split("new_line");

	if (longTextArray.length > 0) {
		for (var i = 0; i < longTextArray.length; i++) {
			longTextLines = longTextLines + longTextArray[i];
		}
	}

	if (fixedValuesResult == 'PASS') {
		iconImage.push('sap-icon://message-success');
	} else if (fixedValuesResult == 'FIX') {
		iconImage.push('sap-icon://message-warning');
	} else if (fixedValuesResult == 'FAIL') {
		iconImage.push('sap-icon://message-error');
	} else if (micDescopeType !== '') {
		iconImage.push('sap-icon://delete');
	} else {
		iconImage.push('sap-icon://pending');
	}

	if (longTextLines != '') {
		iconImage.push('sap-icon://notes');
	}

	var orderNumber = binding.OrderNumber;
	var nodeNumber = binding.NodeNumber;
	var micNumber = binding.MicNumber;
	var inspectionSampleNumber = binding.InspectionSampleNumber;
	var multipleSample = binding.MultipleSample;
	var inspectionCharacteristicNumb = binding.InspectionCharacteristicNumb;
	var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and NodeNumber eq '" + nodeNumber +
		"' and InspectionSampleNumber eq '" + inspectionSampleNumber + "' and MicNumber eq '" + micNumber +
		"' and InspectionCharacteristicNumb eq '" + inspectionCharacteristicNumb + "' and MultipleSample eq '" + multipleSample + "'";

	let countPromise = sectionedTableProxy.count('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicAttachmentSet',
		inspCharQueryOptions)

	return Promise.all([countPromise]).then(function (counts) {
		let count = counts[0];

		if (count > 0) {
			iconImage.push('/SAPAssetManager/Images/attachmentStepIcon.android.png');
			return iconImage;
		} else {
			return iconImage;
		}
	});
}