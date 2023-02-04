let fs = require('file-system');

export default function Attachment_SaveDownloaded(pageProxy) {
	let pageClientData = pageProxy.getClientData();
	let actionBinding = pageProxy.getActionBinding();
	const docDownloadID = actionBinding.DocumentId;
	if (!actionBinding) {
		actionBinding = pageProxy.getPendingDownload('AttachmentList');
	}

	if (actionBinding) {
		let odataID = actionBinding['@odata.id'];
		// Retrieving ID from the string
		let start = odataID.indexOf('\'');
		let end = odataID.lastIndexOf('\'');
		// Need to do start+1 because we dont want ' in our id
		let documentID = odataID.substring(start + 1, end);

		//let documentID = actionBinding.DocumentId;
		let filename = actionBinding.FileName;
		let tempFolder = fs.knownFolders.temp();
		var documentPath;
		
		if (filename && documentID) {
			documentPath = fs.path.join(tempFolder.path, documentID, filename);
		} else {
			documentPath = '';
		}

		var documentFileObject = fs.File.fromPath(documentPath);
		let readLink = actionBinding['@odata.readLink'];
        var content = pageProxy.getClientData()[readLink];

		documentFileObject.writeSync(content, () => {
			return pageProxy.executeAction('/SAPAssetManager/Actions/Documents/DownloadMediaFailure.action');
		});
		
		pageClientData.docDownloadID = undefined;
		/*pageProxy.setActionBinding({
			'FileName': documentPath,
		});
		
		let actionPath = '/SAPAssetManager/Actions/Documents/DocumentOpen.action';
		return pageProxy.executeAction(actionPath);*/
	} else {
		//Logger.error(context.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategoryDocuments.global').getValue(), 'Cannot write document');
	}
}