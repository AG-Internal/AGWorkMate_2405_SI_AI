export default function ParameterUserField02_Text(context) {
	var binding = context.getBindingObject();
	var parameterUserField02Value = binding.ScheduleFinishDate;
	parameterUserField02Value = parameterUserField02Value.toString();
	parameterUserField02Value = parameterUserField02Value.split('T');
	parameterUserField02Value = parameterUserField02Value[0];

	var parameterQueryOptions =
		"$filter=ModuleName eq 'SMART_INSP_INSP_RCRD' and Parameter1 eq 'USER_FIELD_02' and ActiveFlag eq 'X'";
	return context.read('/SmartInspections/Services/SAM.service', 'ParameterDetailsSet', [], parameterQueryOptions).then(
		function (results) {
			var labelText = '';
			if (results && results.length > 0) {
				results.forEach(function (value) {
					if (value.Value3 !== '') {
						labelText = value.Value3 + " - " + parameterUserField02Value;
					}
				});
			}
			return labelText;
		});
}