/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function TextSeqUpdateResponseControl(clientAPI, sValue) {
    /* Set the Value */
    let oProp = clientAPI.evaluateTargetPathForAPI('#Page:-Current/#Control:ResponseControl');
    oProp.setValue(sValue);

}
