export default function TechObjAndInspCharListPage_InspectionType(sectionedTableProxy) {
	var binding = sectionedTableProxy.binding;
	var orderNumber = binding.OrderNumber;
	var technicalObject = binding.TechnicalObject;
	var techObjQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and TechnicalObject eq '" + technicalObject + "'";

	return sectionedTableProxy.read('/SmartInspections/Services/SAM.service', 'TechnicalObjectDetailsSet', [], techObjQueryOptions).then(
		function (results) {
			var inspectionTypeDesc = '';
			if (results && results.length > 0) {
				results.forEach(function (value) {
					inspectionTypeDesc = value.InspectionTypeDesc;
				});
				return inspectionTypeDesc;
			} else {
				return inspectionTypeDesc;
			}
		});
}