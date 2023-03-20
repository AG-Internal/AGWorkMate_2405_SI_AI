/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ResultRecordingPage_AttachIconEnabled(clientAPI) {
    var bVisible = false;

    var binding = clientAPI.getPageProxy().getBindingObject();
    var orderNumber = binding.OrderNumber;
    var nodeNumber = binding.NodeNumber;
    var micNumber = binding.MicNumber;
    var inspectionSampleNumber = binding.InspectionSampleNumber;
    var multipleSample = binding.MultipleSample;
    var inspectionCharacteristicNumb = binding.InspectionCharacteristicNumb;
    var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and NodeNumber eq '" + nodeNumber +
        "' and InspectionSampleNumber eq '" + inspectionSampleNumber + "' and MicNumber eq '" + micNumber +
        "' and InspectionCharacteristicNumb eq '" + inspectionCharacteristicNumb + "' and MultipleSample eq '" + multipleSample + "'";

    let countPromise = clientAPI.count('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicAttachmentSet',
        inspCharQueryOptions)

    return Promise.all([countPromise]).then(function (counts) {
        let count = counts[0];

        if (count > 0) {
            //iconImage.push('/SAPAssetManager/Images/attachmentStepIcon.android.png');
            bVisible = true;
        } else {
            bVisible = false;;
        }
        return bVisible;
    });
}
