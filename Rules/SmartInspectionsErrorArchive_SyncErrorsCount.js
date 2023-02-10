export default function SmartInspectionsErrorArchive_SyncErrorsCount(context) {
	return context.count('/SmartInspections/Services/SAM.service', 'ErrorArchive', '').then(errorCount => {
		var sTitle = "SI Errors (" + errorCount + ")";
		return sTitle;
		// if (errorCount > 0) {
		// 	return errorCount;
		// } else {
		// 	return '';
		// }
	}).catch(() => {
		return Promise.resolve();
	});
}