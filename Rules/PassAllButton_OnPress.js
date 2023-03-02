/*--------------------------------------------------------------------*
* Change Tag    :  D072 - Pass All Sequence
*--------------------------------------------------------------------*/
//01 - Quantitative
//02 - Y/N
//03 - P/F/F
//04 - Quantitative Multiple
//05 - Date

function ExecuteMic02UpdateEntity(pageProxy, binding) {
	pageProxy.setActionBinding(binding);
	//Must return the promised returned by executeAction to keep the chain alive.
	return pageProxy.executeAction('/SmartInspections/Actions/QualitativeYNPassAllSave_UpdateEntity.action');
}

function ExecuteMic03UpdateEntity(pageProxy, binding) {
	pageProxy.setActionBinding(binding);
	//Must return the promised returned by executeAction to keep the chain alive.
	return pageProxy.executeAction('/SmartInspections/Actions/QualitativePFFPassAllSave_UpdateEntity.action');
}

function Wait() {
	return new Promise(r => setTimeout(r, 1));
	//return Promise.resolve();
}

export default function PassAllButton_OnPress(clientAPI) {
	var binding = clientAPI.getPageProxy().binding;
	var orderNumber = binding.OrderNumber;
	var technicalObject = binding.TechnicalObject;
	var descopeType = binding.DescopeType;
	var status = binding.Status;
	var inspectionType = binding.InspectionType;
	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	//B.O.A for D072
	var nActivityInd = clientAPI.showActivityIndicator("'Pass All' Action in Progess. Please wait..");
	//E.O.A for D072
	var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and TechnicalObject eq '" + technicalObject +
		"' and FixedValuesResult eq '' and MicDescopeType eq '' and substringof('" + inspectionType +
		"', InspectionTypes) eq true and (MicType eq '02' or MicType eq '03')";
	//B.O.A for D072
	var sOrderby = "&$orderby=SortNumber, ListCounter, OperationNumber, InspectionCharacteristicNumb";
	inspCharQueryOptions = inspCharQueryOptions + sOrderby;
	//E.O.A for D072
	var inspCharPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet', [],
		inspCharQueryOptions).then(
			function (results) {
				var mic02Objects = [];
				var mic03Objects = [];
				var micAllObjects = []; //++D072
				var resultsQuery = '';
				if (results && results.length > 0) {
					results.forEach(function (value) {
						if (value.MicType === '02') {
							mic02Objects.push(value);
							micAllObjects.push(value);//++D072
							if (resultsQuery === '') {
								resultsQuery = "$filter=CodeValuation eq 'A' and ((MicNumber eq '" + value.MicNumber + "' and Version eq '" + value.Version +
									"' and MicPlant eq '" + value.MicPlant + "')";
							} else {
								resultsQuery = resultsQuery + " or (MicNumber eq '" + value.MicNumber + "' and Version eq '" + value.Version +
									"' and MicPlant eq '" + value.MicPlant + "')"
							}
						} else if (value.MicType === '03') {
							mic03Objects.push(value);
							micAllObjects.push(value);//++D072
						}
					});
				}
				if (resultsQuery !== '') {
					resultsQuery = resultsQuery + ")&$orderby=MicNumber";
				}
				pageClientData.mic02Objects = mic02Objects;
				pageClientData.mic03Objects = mic03Objects;
				pageClientData.micAllObjects = micAllObjects;
				return resultsQuery;
			});

	return Promise.all([inspCharPromise]).then(function (query) {
		var resultsDataQuery = query[0];
		var resultsDataPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'ResultsDataSet', [],
			resultsDataQuery).then(
				function (results) {
					var resultsData = [];
					var curMic = '';
					var preMic = '';
					var curSelectedCode = '';
					var prevSelectedCode = '';
					var selectedCodeObject = {};
					var selectedCodeData = [];
					var counter = 0;
					if (results && results.length > 0) {
						results.forEach(function (value) {
							curMic = value.MicNumber;
							curSelectedCode = value.Code;
							if (preMic === '') {
								preMic = value.MicNumber;
								prevSelectedCode = value.Code;
							}
							if (curMic !== preMic) {
								if (counter === 1) {
									resultsData.push(preMic);
									selectedCodeObject = {
										Mic: preMic,
										Code: prevSelectedCode
									}
									selectedCodeData.push(selectedCodeObject);
								}
								preMic = value.MicNumber;
								prevSelectedCode = value.Code;
								counter = 0;
							}
							counter = counter + 1;
						});
						if (counter === 1) {
							resultsData.push(preMic);
							selectedCodeObject = {
								Mic: preMic,
								Code: prevSelectedCode
							}
							selectedCodeData.push(selectedCodeObject);
						}
					}
					pageClientData.SelectedCode = selectedCodeData;
					return resultsData;
				});

		return Promise.all([resultsDataPromise]).then(function (array) {
			var resultsDataMic = array[0];
			var passAllObjects = pageClientData.mic03Objects;
			var selectedCodes = pageClientData.SelectedCode;
			var latestPromise = Promise.resolve();

			if (resultsDataMic.length > 0) {
				for (var i = 0; i < pageClientData.mic02Objects.length; i++) {
					if (resultsDataMic.includes(pageClientData.mic02Objects[i].MicNumber)) {
						passAllObjects.push(pageClientData.mic02Objects[i]);
					}
				}
			}
			//B.O.A for D072
			//append in the same sequence
			var aPassAllObjectsSorted = [];
			let bPush = false;
			let bCheckMic02 = false;
			if (resultsDataMic.length > 0) {
				bCheckMic02 = true;
			}
			for (var p = 0; p < pageClientData.micAllObjects.length; p++) {
				bPush = false;
				let maBinding = pageClientData.micAllObjects[p];
				if (maBinding.MicType === '03') {
					//Directly Push t
					bPush = true;
				} else if (maBinding.MicType === '02' && bCheckMic02) {
					//Check if it has Result , then Push it
					if (resultsDataMic.includes(maBinding.MicNumber)) {
						bPush = true;
					}
				}
				if (bPush) {
					aPassAllObjectsSorted.push(maBinding);
				}
				bPush = false;
			}
			passAllObjects = aPassAllObjectsSorted;
			//E.O.A for D072
			if (passAllObjects.length > 0) {
				for (var i = 0; i < passAllObjects.length; i++) {
					let binding = passAllObjects[i];
					var code = '';
					if (binding.MicType === '02') {
						for (var j = 0; j < selectedCodes.length; j++) {
							if (selectedCodes[j].Mic === binding.MicNumber) {
								code = selectedCodes[j].Code;
								break;
							}
						}
						binding.FixedValuesResult = 'PASS';
						binding.Result = code;
						let bindingObject = binding;
						latestPromise = latestPromise.then(() => {
							return ExecuteMic02UpdateEntity(pageProxy, bindingObject);
						}).then(Wait);
					} else if (binding.MicType === '03') {
						binding.FixedValuesResult = 'PASS';
						let bindingObject = binding;
						latestPromise = latestPromise.then(() => {
							return ExecuteMic03UpdateEntity(pageProxy, bindingObject);
						}).then(Wait);
					}
				}
				return latestPromise.then(function () {
					clientAPI.dismissActivityIndicator(nActivityInd); //++D072
					return pageProxy.executeAction('/SmartInspections/Actions/Save_SuccessMessage.action');
				}.bind(pageProxy));
			} else {
				clientAPI.dismissActivityIndicator(nActivityInd); //++D072
				return pageProxy.executeAction('/SmartInspections/Actions/NoPassAllDataToSave_Message.action');
			}
		});
	});
}