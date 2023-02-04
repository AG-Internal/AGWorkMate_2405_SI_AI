export default function TechnicalObjectDetailsListPage_PassFixFailCount(sectionedTableProxy) {
	var binding = sectionedTableProxy.binding;
	//var orderNumber = binding.OrderNumber;
	var technicalObject = binding.TechnicalObject;
	//var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and TechnicalObject eq '" + technicalObject + "'";
	let pageProxy = sectionedTableProxy.getPageProxy();
	let clientData = '';
	var passCount = 0;
	var fixCount = 0;
	var failCount = 0;
	var descopeCount = 0;

	try {
		clientData = sectionedTableProxy.evaluateTargetPath("#Page:TechnicalObjectDetailsList/#ClientData");
	} catch (err) {}
	var inspCharObjectsArray = clientData.InspCharObjects;

	var inspCharObjects = inspCharObjectsArray.filter(element => element.TechnicalObject === technicalObject);

	for (var i = 0; i < inspCharObjects.length; i++) {
		var value = inspCharObjects[i];
		//if (value.TechnicalObject === technicalObject) {
		if (value.FixedValuesResult === 'PASS') {
			passCount = passCount + 1;
		} else if (value.FixedValuesResult === 'FIX') {
			fixCount = fixCount + 1;
		} else if (value.FixedValuesResult === 'FAIL') {
			failCount = failCount + 1;
		} else if (value.MicDescopeType !== '') {
			descopeCount = descopeCount + 1;
		}
		//}
	}
	return "Pass: " + passCount + " Fix: " + fixCount + " Fail: " + failCount + " Descope: " + descopeCount;
}