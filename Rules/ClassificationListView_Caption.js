import CommonLibrary from '../../SAPAssetManager/Rules/Common/Library/CommonLibrary';

export default function ClassificationListView_Caption(context) {
	let entityType = context.binding['@odata.type'];
	if (entityType.includes('TechnicalObjectDetails')) {
		var binding = context.binding;
		var technicalObject = binding.TechnicalObject;
		var equipmentFlag = binding.EquipmentFlag;
		var equipment = binding.Equipment;
		var functionalLocationInt = binding.FunctionalLocationInt;
		var entitySet = '';
		var finalQuery = '$expand=ClassDefinition';

		if (equipmentFlag === 'X') {
			entitySet = 'MyEquipments(\'' + equipment + '\')/Classes';
		} else {
			entitySet = 'MyFunctionalLocations(\'' + functionalLocationInt + '\')/Classes';
		}

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
			} else {
				finalQuery = '$expand=ClassDefinition' + query;
			}
			return CommonLibrary.getEntitySetCount(context, entitySet, finalQuery).then(count => {
				let params = [count];
				return context.localizeText('classifications_x', params);
			});
		});
	} else {
		return CommonLibrary.getEntitySetCount(context, context.binding['@odata.readLink'] + '/Classes', '').then(count => {
			let params = [count];
			return context.localizeText('classifications_x', params);
		});
	}
}