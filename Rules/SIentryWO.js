export default function ResultType(context) {
	let wo = context.binding.OrderId;
	return "$filter=OrderNumber eq '" + wo + "'";
}