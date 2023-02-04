export default function DefectCode_QueryOptions(sectionedTableProxy) {
	var technicalObject = sectionedTableProxy.binding.TechnicalObject;
	var queryOptions = "$filter=TechnicalObject eq '" + technicalObject + "'&$orderby=DefCode";
	return queryOptions;
}