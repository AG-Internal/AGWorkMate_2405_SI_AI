export default function TechnicalObjectDetailsListPage_Icon(sectionedTableProxy) {
	var binding = sectionedTableProxy.binding;
	//var orderNumber = binding.OrderNumber;
	//var technicalObject = binding.TechnicalObject;
	var descopeType = binding.DescopeType;
	var iconImage = [];

	if (descopeType !== '') {
		iconImage.push('sap-icon://delete');
		return iconImage;
	} else {
		return iconImage;
	}
}