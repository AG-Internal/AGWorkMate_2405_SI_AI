export default function InspectionCharacteristicDetailsSaveLongText_GetValue(clientAPI) {
	var micType = clientAPI.getPageProxy().getBindingObject().MicType;
	var pageName = '';

	if (micType === '01') {
		pageName = 'Quantitative';
	} else if (micType === '02') {
		pageName = 'QualitativeYN';
	} else if (micType === '03') {
		pageName = 'QualitativePFF';
	} else if (micType === '04') {
		pageName = 'QuantitativeMultiple';
	} else if (micType === '05') {
		pageName = 'QualitativeDate';
	}

	var status = clientAPI.evaluateTargetPath('#Page:' + pageName + '/#Control:Status/#Value');
	var longText = clientAPI.getPageProxy().getBindingObject().LongText;

	if (Object.keys(status).length !== 0) {
		return longText;
	} else {
		var value = "";
		return value;
	}
}