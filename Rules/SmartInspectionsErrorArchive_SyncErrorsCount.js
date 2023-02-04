export default function SmartInspectionsErrorArchive_SyncErrorsCount(context) {
	return context.count('/SmartInspections/Services/SAM.service', 'ErrorArchive', '').then(errorCount => {
		if (errorCount > 0) {
			return errorCount;
		} else {
			return '';
		}
	}).catch(() => {
		return Promise.resolve();
	});
}