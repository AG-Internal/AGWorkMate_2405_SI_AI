/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function onPressWorkOrders(clientAPI) {
    let pageProxy = clientAPI.getPageProxy();
    let appClientData = pageProxy.getAppClientData();

    //Setting Flag to be used in WO List View Query:
    appClientData.triggeredFrom = "WORK_ORDERS";

    //Calling the WO List View Action:
    clientAPI.executeAction('/SmartInspections/Actions/WorkMate/SIInspectionToWOList.action');

}
