export default function WOexistInSI_Closed(context) {
	let wo = context.binding.OrderId;
	let qry = "$filter=OrderNumber eq '" + wo + "'" + " and CloseOrder eq 'X'";
	return context.count('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet', qry).then(function (count) {
		if (count > 0)
			return true;
		else
			return false;
	});
}