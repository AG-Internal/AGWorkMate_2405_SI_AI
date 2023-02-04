function setBindingOnParent(context, binding) {
	context.setActionBinding(binding);
	return context.executeAction('/SmartInspections/Actions/AddAttachmentSave_CreateMedia.action');
}

function Wait() {
	return new Promise(r => setTimeout(r, 2000))
}

export default function AddAttachment_SaveValidation(context) {
	var binding = context.binding;
	var orderNumber = binding.OrderNumber;
	var technicalObject = binding.TechnicalObject;
	var inspectionSampleNumber = binding.InspectionSampleNumber;
	var operationNumber = binding.OperationNumber;
	var inspectionCharacteristicNumb = binding.InspectionCharacteristicNumb;
	var micNumber = binding.MicNumber;
	var nodeNumber = binding.NodeNumber;
	var multipleSample = binding.MultipleSample;
	var attachmentControl = context.getControl('FormCellContainer').getControl('Attachments');
	var attachmentList = attachmentControl.getValue();
	var attachmentDescriptionControl = context.getControl('FormCellContainer').getControl('AttachmentDescription');
	var attachmentDescriptionValue = attachmentDescriptionControl.getValue();

	if (attachmentDescriptionValue == '' || attachmentDescriptionValue == undefined) {
		return context.executeAction('/SmartInspections/Actions/AttachmentNoDescription_ErrorMessage.action');
	} else if (attachmentList.length > 0) {

		let isIOS = context.nativescript.platformModule.isIOS;
		let documents = isIOS ? context.nativescript.utilsModule.ios.collections.nsArrayToJSArray(attachmentList) : attachmentList;
		let documentResult = Promise.resolve();

		for (var i = 0; i < documents.length; i++) {
			let attachment = documents[i];
			documentResult = documentResult.then(() => {
				let contentType = isIOS ? attachment.valueForKey('contentType').split('/') : attachment.contentType.split('/');
				let mimeType = contentType[1];
				let fullFileName = isIOS ? attachment.valueForKey('urlString') : attachment.urlString;
				let fileName = fullFileName.split('/').pop();

				let bindingItems = {
					'OrderNumber': orderNumber,
					'NodeNumber': nodeNumber,
					'InspectionSampleNumber': inspectionSampleNumber,
					'InspectionCharacteristicNumb': inspectionCharacteristicNumb,
					'MicNumber': micNumber,
					'MultipleSample': multipleSample,
					'TechnicalObject': technicalObject,
					'OperationNumber': operationNumber,
					'Attachment': [attachment],
					'ContentType': mimeType,
					'FileName': fileName,
					'Description': attachmentDescriptionValue,
					'Slug': orderNumber + "|" + nodeNumber + "|" + inspectionSampleNumber + "|" + inspectionCharacteristicNumb + "|" +
						micNumber + "|" + multipleSample + "|" + fileName + "|" + attachmentDescriptionValue + "|" + mimeType
				};
				return setBindingOnParent(context, bindingItems);
			}).then(Wait);
		}

		return documentResult.then(function () {
			return context.executeAction('/SmartInspections/Actions/AddAttachment_Close.action');
		}.bind(context));

	} else {
		return context.executeAction('/SmartInspections/Actions/AttachmentNoFile_ErrorMessage.action');
	}
}