export default function NavToResultsRecordingPage(clientAPI) {
	var binding = clientAPI.getPageProxy().getActionBinding();
	let pageProxy = clientAPI.getPageProxy();
	var micType = binding.MicType;
	var isDescoped = binding.IsDescoped;
	var isDescopedTo = binding.IsDescopedTo;
	var isDescopedMic = binding.IsDescopedMic;
	var micDescopeTypeDesc = binding.MicDescopeTypeDesc;
	var descopeTypeDesc = binding.DescopeTypeDesc;
	let odataID = binding['@odata.id'];

	if (odataID.indexOf("HistoryDetailsSet") !== -1) {
		let pageClientData = pageProxy.getClientData();
		pageClientData.navFromHistory = 'X';

		if (isDescoped === true) {
			if (isDescopedTo === true) {
				pageClientData.DescopeTypeDesc = descopeTypeDesc;
				pageClientData.DescopeLevel = 'TO';
			} else {
				pageClientData.DescopeTypeDesc = micDescopeTypeDesc;
				pageClientData.DescopeLevel = 'MIC';
			}
		}
	}

	/*
	01 Quantitative 
	02 Qualitative Y/ N
	03 Qualitative P/ F/ F
	04 Quantitative Multiple
	05 Qualitative Date
	*/

	var orderNumber = binding.OrderNumber;
	var technicalObject = binding.TechnicalObject;
	var query = "$filter=OrderNumber eq '" + orderNumber + "' and TechnicalObject eq '" + technicalObject + "' and DescopeType ne ''";
	var countTechPromise = clientAPI.count('/SmartInspections/Services/SAM.service', 'TechnicalObjectDetailsSet', query);

	return Promise.all([countTechPromise]).then(function (counts) {
		let count = counts[0];
		if (count > 0 || isDescoped === true) {
			return clientAPI.executeAction('/SmartInspections/Actions/NavToDescopedInspChar_ErrorMessage.action');
		} else {
			if (micType === '01') {
				return clientAPI.executeAction('/SmartInspections/Actions/NavToQuantitative.action');
			} else if (micType === '02') {
				return clientAPI.executeAction('/SmartInspections/Actions/NavToQualitativeYN.action');
			} else if (micType === '03') {
				return clientAPI.executeAction('/SmartInspections/Actions/NavToQualitativePFF.action');
			} else if (micType === '04') {
				return clientAPI.executeAction('/SmartInspections/Actions/NavToQuantitativeMultiple.action');
			} else if (micType === '05') {
				return clientAPI.executeAction('/SmartInspections/Actions/NavToQualitativeDate.action');
			}
		}
	});
}