let fs = require('file-system');

export default function AttachmentList_DownloadOrOpen(sectionedTableProxy) {
	const pageProxy = sectionedTableProxy.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	let documentObject = pageProxy.getActionBinding();
	let readLink = documentObject['@odata.readLink'];
	let serviceName = '/SmartInspections/Services/SAM.service';
	let entitySet = readLink.split('(')[0];
	const docDownloadID = documentObject.DocumentId;

	// Check if media already exists or needs to be downloaded
	return sectionedTableProxy.isMediaLocal(serviceName, entitySet, readLink).then((isMediaLocal) => {
		if (isMediaLocal) {
			//let documentPath = DocumentPath(sectionedTableProxy, documentObject);
			let odataID = documentObject['@odata.id'];
			// Retrieving ID from the string
			let start = odataID.indexOf('\'');
			let end = odataID.lastIndexOf('\'');
			// Need to do start+1 because we dont want ' in our id
			let documentID = odataID.substring(start + 1, end);

			//let documentID = actionBinding.DocumentId;
			let filename = documentObject.FileName;
			let tempFolder = fs.knownFolders.temp();
			var documentPath;

			if (filename && documentID) {
				documentPath = fs.path.join(tempFolder.path, documentID, filename);
			} else {
				documentPath = '';
			}
			let writeError = undefined;
			let promise = Promise.resolve(documentPath);

			if (!fs.File.exists(documentPath)) {
				promise = sectionedTableProxy.executeAction('/SmartInspections/Actions/AttachmentDownload_DownloadMedia.action').then(
					() => {
						// the media has been downloaded, we can open it -> the path needs to be provided in the action definition
						// or it should come from binding
						let documentFileObject = fs.File.fromPath(documentPath);
						let content = pageProxy.getClientData()[documentObject['@odata.readLink']];

						//if (libVal.evalIsEmpty(documentPath) || typeof documentObject === 'undefined') {
						if (!documentPath) {
							return pageProxy.executeAction('/SmartInspections/Actions/AttachmentDownload_StreamsFailure.action');
						}
						documentFileObject.writeSync(content, err => {
							writeError = err;
						});
						//libCommon.clearFromClientData(sectionedTableProxy, docDownloadID, undefined, true);
						pageClientData.docDownloadID = undefined;

						return documentPath;
					});
			}

			return promise.then(docPath => {
				if (writeError) {
					actionPath = '/SmartInspections/Actions/AttachmentDownload_StreamsFailure.action';
				}
				pageProxy.setActionBinding({
					'FileName': docPath,
				});
				
				let actionPath = '/SmartInspections/Actions/Attachment_Open.action';
				return pageProxy.executeAction(actionPath);
			});

		} else {
			// The media is on the server. This server could be SAP backend or it could be cached on OData Offline Service on HCP.
			// We need to download it.
			/*
			    Check state of media. If media download is already in progress, then prevent user from requesting
			    media from server again. Multiple clicks from the user, send multiple requests for the same media 
			    to the server, resulting in errors being thrown and the document still downloading successfully.
			*/

			let isDownloadInProgress = pageClientData.docDownloadID;

			// If download is already in progress, ignore the click from user.
			if (!isDownloadInProgress) {
				// The media is on the server. This is the user's first request\click to download the media.

				//Set internal media state to 'in progress'.
				//libCommon.setStateVariable(sectionedTableProxy, docDownloadID, 'inProgress');
				pageClientData.docDownloadID = 'inProgress';

				//Set indicator icon on ObjectCell to be 'in progress' pic to tell user download of media is in progress.
				const pressedItem = pageProxy.getPressedItem();
				let objectTableSection;
				sectionedTableProxy.getSections().forEach(function (key) {
					if (key.getName() === 'AttachmentList') {
						objectTableSection = key;
					}
				});

				objectTableSection.setIndicatorState('inProgress', pressedItem);

				return sectionedTableProxy.executeAction('/SmartInspections/Actions/AttachmentDownload_DownloadStream.action')
					.then((result) => {
						//MDK OfflineOData.Download action returns a resoved Promise on download error. This bug is fixed in MDK 2.1.200.
						if (result.data && result.data.search(/error/i)) {
							//libCommon.clearFromClientData(sectionedTableProxy, docDownloadID, undefined, true);
							pageClientData.docDownloadID = undefined;
							objectTableSection.setIndicatorState('toDownload', pressedItem);
							//sectionedTableProxy.redraw();
							return sectionedTableProxy.executeAction('/SmartInspections/Actions/AttachmentDownload_StreamsFailure.action');
						}
						return Promise.resolve();
					}, () => {
						//libCommon.clearFromClientData(sectionedTableProxy, docDownloadID, undefined, true);
						pageClientData.docDownloadID = undefined;
						objectTableSection.setIndicatorState('toDownload', pressedItem);
						//sectionedTableProxy.redraw();
						return sectionedTableProxy.executeAction('/SmartInspections/Actions/AttachmentDownload_StreamsFailure.action');
					});
			} else {
				return Promise.resolve();
			}
		}
	});

}