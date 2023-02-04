export default function AttachmentList_SetIndicatorState(sectionProxy) {
	const binding = sectionProxy.binding;
	const pageProxy = sectionProxy.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	let readLink = binding['@odata.readLink'];
	let serviceName = '/SmartInspections/Services/SAM.service';
	let entitySet = readLink.split('(')[0];
	const docDownloadID = binding.DocumentId;

	// Check if media already exists or needs to be downloaded
	return sectionProxy.isMediaLocal(serviceName, entitySet, readLink).then((isMediaLocal) => {
		let isDownloadInProgress = pageClientData.docDownloadID;
		if (isMediaLocal) {
			// The media is saved locally, we can open it
			return 'open';
		} else if (isDownloadInProgress || (readLink && sectionProxy.downloadInProgressForReadLink(readLink))) {
			// the media is currently being downloaded
			return 'inProgress';
		} else {
			// The media is on the server, we can download it
			return 'toDownload';
		}
	});
}