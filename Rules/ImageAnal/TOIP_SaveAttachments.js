/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { ImageAnal } from "./ImageAnal";
import libVal from '../Common/ValidationLibrary';
function setBindingOnParent(context, binding) {
    context.setActionBinding(binding);
    return context.executeAction('/SmartInspections/Actions/AddAttachmentSave_CreateMedia.action');
}

function Wait() {
    return new Promise(r => setTimeout(r, 100))
}

export default function TOIP_SaveAttachments(context) {
    var binding = ImageAnal._obTechObject;//Get the biniding

    var orderNumber = binding.OrderNumber;//Order No
    var technicalObject = binding.TechnicalObject;//tech Object
    var inspectionSampleNumber = binding.InspectionSampleNumber;//Probenr
    var operationNumber = '0000';
    var inspectionCharacteristicNumb = '0000';
    var micNumber = '0';
    var nodeNumber = '00000000';
    var multipleSample = '0000';
    //Attachment List
    var attachmentList = ImageAnal._oAttachControlValue;
    //Tech obje Desc
    var TechnicalObjectDesc = binding.TechnicalObject;
    if (libVal.evalIsEmpty(binding.FunctionalLocation)) {
        TechnicalObjectDesc = binding.EquipmentDescription;//Equipment (if Floc is initial)
    } else {
        TechnicalObjectDesc = binding.FunctionalLocationDesc; //Floc Desc
    }
    if (!TechnicalObjectDesc) { //If Text is empty pass the Technical Object Itself
        TechnicalObjectDesc = binding.TechnicalObject;
    }
    var sAttachDescPrefix = `${TechnicalObjectDesc}_AI_`;
    var attachmentDescriptionValue = "";

    if (attachmentList.length > 0) {
        var nActivityInd = context.showActivityIndicator("Attaching the Images to Equipment. Please wait...");
        let isIOS = context.nativescript.platformModule.isIOS;
        let documents = isIOS ? context.nativescript.utilsModule.ios.collections.nsArrayToJSArray(attachmentList) : attachmentList;
        let documentResult = Promise.resolve();
let iTempCount = 0;
        for (var i = 0; i < documents.length; i++) {
            let attachment = documents[i];
            documentResult = documentResult.then(() => {
                let contentType = isIOS ? attachment.valueForKey('contentType').split('/') : attachment.contentType.split('/');
                let mimeType = contentType[1];
                let fullFileName = isIOS ? attachment.valueForKey('urlString') : attachment.urlString;
                let fileName = fullFileName.split('/').pop();
                iTempCount += 1;
                if (!fileName.includes(".")) {
                    //If no Extension found - Build file name Example -EquipmentName_1.jpeg
                    fileName = `${technicalObject}_${iTempCount}.${mimeType}`;
                }
                attachmentDescriptionValue = `${sAttachDescPrefix}${iTempCount}`;
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
            context.dismissActivityIndicator(nActivityInd);
            return context.executeAction('/SmartInspections/Actions/SIAttachments/TechObj_Close_AttachSaveSuccess.action');
        }.bind(context));

    } else {
        //Close page if no Attachment found
        return context.executeAction("/SmartInspections/Actions/TextTemplates/ClosePage.action");
    }
}
