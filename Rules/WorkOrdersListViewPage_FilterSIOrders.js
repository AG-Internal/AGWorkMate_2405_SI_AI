export default function WorkOrdersListViewPage_FilterSIOrders(clientAPI) {
	let table = clientAPI.getControl("SectionedTable").getControl("WorkOrdersListSection");
	alert(Object.entries(table));
	var specifier = table.getTarget();
	alert(specifier);
}