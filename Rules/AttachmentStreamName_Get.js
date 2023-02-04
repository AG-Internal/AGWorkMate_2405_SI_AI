export default function AttachmentStreamName_Get(clientAPI) {
    let actionBinding = clientAPI.getActionBinding();
    return actionBinding['@odata.id'].replace(/[()=',]/g, '');
}
