export default function TechObjAndInspCharListPage_TechObjColor(sectionedTableProxy) {
	var binding = sectionedTableProxy.binding;
	var micDescopeType = binding.MicDescopeType;
	var style = '';

	if (micDescopeType !== '') {
		style = 'textColorGrey';
		return style;
	} else {
		return style;
	}
}