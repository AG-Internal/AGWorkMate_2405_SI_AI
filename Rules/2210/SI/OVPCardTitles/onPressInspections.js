/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import libCom from '../../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';

export default function onPressInspections(clientAPI) {

    libCom.setStateVariable(clientAPI, 'WorkOrderListFilter', 'ALL_JOBS');
    libCom.setStateVariable(clientAPI, 'WORKORDER_FILTER', '$filter=');
    libCom.setStateVariable(clientAPI,'FromOperationsList', false);

    let pageProxy = clientAPI.getPageProxy();
    let appClientData = pageProxy.getAppClientData();

    //Setting Flag to be used in WO List View Query:
    appClientData.triggeredFrom = "INSPECTIONS";

    //Calling the WO List View Action:
    clientAPI.executeAction('/SmartInspections/Actions/WorkMate/SIInspectionToWOList.action');
}
