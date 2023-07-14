/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import libWoStatus from '../../../../SAPAssetManager/Rules/WorkOrders/MobileStatus/WorkOrderMobileStatusLibrary';
import libCommon from '../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';

export default function WorkOrderUpdateNav_WOListViewTrailing(clientAPI) {
    let queryOption = '$select=*,Equipment/EquipId,FunctionalLocation/FuncLocIdIntern&$expand=MarkedJob,Equipment,FunctionalLocation,WODocuments,OrderMobileStatus_Nav';
    let binding = libCommon.setBindingObject(clientAPI);
    //return libCommon.navigateOnRead(clientAPI, '/SAPAssetManager/Actions/WorkOrders/CreateUpdate/WorkOrderCreateUpdateNav.action', binding['@odata.readLink'], queryOption);
    return libWoStatus.isOrderComplete(clientAPI).then(status => {
        if (!status) {
            //Set the global TransactionType variable to CREATE
            return libCommon.navigateOnRead(clientAPI, '/SAPAssetManager/Actions/WorkOrders/CreateUpdate/WorkOrderCreateUpdateNav.action', binding['@odata.readLink'], queryOption);
        } else {
            return libCommon.navigateOnRead(clientAPI, '/SAPAssetManager/Actions/WorkOrders/CreateUpdate/WorkOrderCreateUpdateNav.action', binding['@odata.readLink'], queryOption);
        }
    });
}
