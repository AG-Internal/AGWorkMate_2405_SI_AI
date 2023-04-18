export default function WOexistInSI_Open(context) {
	let wo = context.binding.OrderId;
	let qry = "$filter=OrderNumber eq '" + wo + "'" + " and CloseOrder eq ''";
	return context.count('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet', qry).then(function (count) {
		if (count > 0)
			return true;
		else
			return false;
	});
}