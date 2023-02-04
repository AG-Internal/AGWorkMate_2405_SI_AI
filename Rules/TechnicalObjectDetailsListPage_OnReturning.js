export default function TechnicalObjectDetailsListPage_OnReturning(clientAPI) {
	var control = clientAPI.getControl('SectionedTable0');
	control.redraw();
	return true;
}