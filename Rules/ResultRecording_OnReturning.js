import onLoaded from './ResultRecording_OnLoaded';

export default function ResultRecording_OnReturning(clientAPI) {
	let currentPage = clientAPI.getPageProxy().currentPage;
	let currentPageString = currentPage.toString();
	var micDescopeType = clientAPI.getPageProxy().getBindingObject().MicDescopeType;

	if (micDescopeType === '') {
		return;
	}

	if (currentPageString.indexOf("QualitativeDate") !== -1) {
		onLoaded.QualitativeDatePage_OnLoaded(clientAPI);
	} else if (currentPageString.indexOf("QualitativePFF") !== -1) {
		onLoaded.QualitativePFFPage_OnLoaded(clientAPI);
	} else if (currentPageString.indexOf("QualitativeYN") !== -1) {
		onLoaded.QualitativeYNPage_OnLoaded(clientAPI);
	} else if (currentPageString.indexOf("QuantitativeMultiple") !== -1) {
		onLoaded.QuantitativeMultiplePage_OnLoaded(clientAPI);
	} else if (currentPageString.indexOf("Quantitative") !== -1) {
		onLoaded.QuantitativePage_OnLoaded(clientAPI);
	}
}