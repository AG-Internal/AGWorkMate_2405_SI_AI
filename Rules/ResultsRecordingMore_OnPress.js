import saveValidationPFF from './QualitativePFFPage_SaveValidations.rule';

export default function ResultsRecordingMore_OnPress(clientAPI) {

	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	var micType = clientAPI.getPageProxy().getBindingObject().MicType;

	if (micType === '01') {} else if (micType === '02') {} else if (micType === '03') {
		pageClientData.PageName = "QualitativePFF";
		pageClientData.LastPressed = "More";
		return saveValidationPFF.QualitativePFFPage_SaveValidations(clientAPI);
	} else if (micType === '04') {} else if (micType === '05') {}
}