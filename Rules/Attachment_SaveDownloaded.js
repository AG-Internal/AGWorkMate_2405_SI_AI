//let fs = require('file-system');
/*--------------------------------------------------------------------*
* Change Tag    :  UAT019 - Altering the Attachment Review Logic After 
							Uploading.
*--------------------------------------------------------------------*/
//B.O.A for UAT019
import writeDocument from '../../SAPAssetManager/Rules/Documents/Save/DocumentSave';
import	DocumentActionBinding from '../../SAPAssetManager/Rules/Documents/DocumentActionBinding';
//E.O.A for UAT019

export default function Attachment_SaveDownloaded(pageProxy) {
//B.O.A for UAT019				
	let actionBinding = DocumentActionBinding(pageProxy);		
	let documentobject = actionBinding.Document ? actionBinding.Document : actionBinding.PRTDocument;
	writeDocument(pageProxy,documentobject);
}
//E.O.A for UAT019		

//B.O.A for UAT019	
	/*let fs = sectionedTableProxy.nativescript.fileSystemModule;//CF by RB
	let pageClientData = pageProxy.getClientData();
	let actionBinding = pageProxy.getActionBinding();
	const docDownloadID = actionBinding.DocumentId;
	if (!actionBinding) {
		actionBinding = pageProxy.getPendingDownload('AttachmentList');
	}*/

	/*if (actionBinding) {
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
	//}*/ 
	//else {
		//Logger.error(context.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategoryDocuments.global').getValue(), 'Cannot write document');
	//}
//E.O.A for UAT019	
//}