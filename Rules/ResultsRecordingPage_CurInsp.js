import libVal from './Common/ValidationLibrary';

export default function ResultsRecordingPage_CurInsp(context) {
	var binding = context.binding;
	var orderNumber = binding.OrderNumber;
	var technicalObject = binding.TechnicalObject;
	var micDescopeType = binding.MicDescopeType;
	var micDescopeDesc = binding.MicDescopeDesc;
	var techObjQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and TechnicalObject eq '" + technicalObject + "'";

	return context.read('/SmartInspections/Services/SAM.service', 'TechnicalObjectDetailsSet', [], techObjQueryOptions).then(
		function (results) {
			var valueString = '';
			if (results && results.length > 0) {
				results.forEach(function (value) {
					if (!libVal.evalIsEmpty(value.InspectionType)) {
						valueString = "CURRENT - " + value.InspectionTypeDesc + " ";
					}
				});
				if (micDescopeType !== '') {
					valueString = valueString + "(DESCOPED - " + micDescopeDesc + ")";
				}
				return valueString;
			} else {
				if (micDescopeType !== '') {
					valueString = valueString + "(DESCOPED - " + micDescopeDesc + ")";
				}
				return valueString;
			}
		});
}