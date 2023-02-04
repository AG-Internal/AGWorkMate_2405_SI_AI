export default function AttachmentStreamQuery_Get(clientAPI) {
    let actionBinding = clientAPI.getActionBinding();
    return actionBinding['@odata.readLink'];
}
