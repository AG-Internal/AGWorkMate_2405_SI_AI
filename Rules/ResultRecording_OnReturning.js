import onLoaded from './ResultRecording_OnLoaded';

export default function ResultRecording_OnReturning(clientAPI) {
	let currentPage = clientAPI.getPageProxy().currentPage;
	let currentPageString = currentPage.toString();
	var micDescopeType = clientAPI.getPageProxy().getBindingObject().MicDescopeType;
	//B.O.A by RB for AM0001
	var pageClientData = clientAPI.getPageProxy().getClientData();
	if (pageClientData.fromDGListPkr) {
		//get the Control and Set the Data
		var defectCodeGroupControl = clientAPI.evaluateTargetPath('#Page:' + pageClientData.pageName + '/#Control:DefectCodeGroup');
		defectCodeGroupControl.setValue(pageClientData.defectCodeGroupValue, false);
		defectCodeGroupControl.redraw();
		//Clear the Client Data & Flag After setting data
		pageClientData.defectCodeGroupValue = "";
		pageClientData.pageName = "";
		pageClientData.fromDGListPkr = false;
	}
	//E.O.A by RB for AM0001

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