export default function TechnicalObjectDetailsListPage_TechDescColor(sectionedTableProxy) {
	var binding = sectionedTableProxy.binding;
	//var orderNumber = binding.OrderNumber;
	//var technicalObject = binding.TechnicalObject;
	var descopeType = binding.DescopeType;
	var style = '';

	if (descopeType !== '') {
		style = 'textColorGrey';
		return style;
	} else {
		return style;
	}
}