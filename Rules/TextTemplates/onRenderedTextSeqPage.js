/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function onRenderedConfigPage(clientAPI) {
    let oProp = clientAPI.evaluateTargetPathForAPI('#Page:-Current/#Control:ResponseControl');
    oProp.setFocus();
}
