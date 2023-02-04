export default function ClassificationListView_Query(context) {
	//$expand=ClassDefinition&$filter=ClassId eq 'GENERAL'
	let entityType = context.binding['@odata.type'];
	let readLink = context.binding['@odata.readLink'];
	var finalQuery = '$expand=ClassDefinition';

	if (entityType === '#sap_mobile.MyEquipment' || entityType === '#sap_mobile.MyFunctionalLocation') {
		return finalQuery;
	} else {
		var parameterQueryOptions =
			"$filter=ModuleName eq 'SMART_INSP_MOBILE' and Parameter1 eq 'EDIT_CLASSIFICATION' and Parameter2 eq 'TECH_OBJECTS' and ActiveFlag eq 'X'";
		var parameterPromise = context.read('/SmartInspections/Services/SAM.service', 'ParameterDetailsSet', [], parameterQueryOptions).then(
			function (results) {
				var filterQuery = '';
				if (results && results.length > 0) {
					results.forEach(function (value) {
						if (filterQuery === '') {
							filterQuery = "&$filter=ClassId eq '" + value.Value1 + "'";
						} else {
							filterQuery = filterQuery + " or ClassId eq '" + value.Value1 + "'";
						}
					});
				}
				return filterQuery;
			});

		return Promise.all([parameterPromise]).then(function (values) {
			var query = values[0];
			if (query === '') {
				finalQuery = '$expand=ClassDefinition';
				return finalQuery;
			} else {
				finalQuery = '$expand=ClassDefinition' + query;
				return finalQuery;
			}
		});
		return finalQuery;
	}
}