export default function DefectCodeListPicker_OnValueChange(context) {
	var micType = context.getPageProxy().getBindingObject().MicType;
	var defectCodeGroupValue = context.getValue()[0].DisplayValue.Subhead;
	var pageName = '';
	let pageProxy = context.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	pageClientData.DataChanged = 'X';

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

	var defectCodeGroupControl = context.evaluateTargetPath('#Page:' + pageName + '/#Control:DefectCodeGroup');
	defectCodeGroupControl.setValue(defectCodeGroupValue, false);
	defectCodeGroupControl.redraw();
	//B.O.A by RB for AM0001
	//set the Data & Flag in Client data and handle in OnReturning
	pageClientData.fromDGListPkr = true;
	pageClientData.pageName = pageName;
	pageClientData.defectCodeGroupValue =  defectCodeGroupValue;
	//E.O.A by RB for AM0001
}