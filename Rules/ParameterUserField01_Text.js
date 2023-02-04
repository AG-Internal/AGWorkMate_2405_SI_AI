export default function ParameterUserField01_Text(context) {
	var binding = context.getBindingObject();
	var parameterUserField01Value = binding.ScheduleStartDate;
	parameterUserField01Value = parameterUserField01Value.toString();
	parameterUserField01Value = parameterUserField01Value.split('T');
	parameterUserField01Value = parameterUserField01Value[0];

	var parameterQueryOptions =
		"$filter=ModuleName eq 'SMART_INSP_INSP_RCRD' and Parameter1 eq 'USER_FIELD_01' and ActiveFlag eq 'X'";
	return context.read('/SmartInspections/Services/SAM.service', 'ParameterDetailsSet', [], parameterQueryOptions).then(
		function (results) {
			var labelText = '';
			if (results && results.length > 0) {
				results.forEach(function (value) {
					if (value.Value3 !== '') {
						labelText = value.Value3 + " - " + parameterUserField01Value;
					}
				});
			}
			return labelText;
		});
}