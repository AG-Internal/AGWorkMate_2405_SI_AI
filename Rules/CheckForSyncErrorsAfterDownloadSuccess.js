/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function CheckForSyncErrorsAfterDownloadSuccess(clientAPI) {

    clientAPI.count('/SmartInspections/Services/SAM.service', 'ErrorArchive', '').then(result => {
        if (result > 0) {
            //clientAPI.executeAction('/SAPAssetManager/Actions/OData/ODataUploadFailureMessage.action');
            clientAPI.executeAction('/SmartInspections/Actions/OData/ODataUploadFailureMessage.action');
        } else {
            clientAPI.executeAction('/SmartInspections/Actions/SISyncSuccessMessage.action');
        }
    });
}