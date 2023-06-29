/**Change Tag : SIV2203, Date:1-Nov-22, Description: EX Group, 
New Rule
1. To add EX Related MICs based on the EX Group
2. Update the Tech object's SUmmary table for EX changes
3. Add New MICs in Lot
4. Update Workorder Snapshot 
**** Important Flags : AddInWoSnap , DeleteFromWoSnap , EXCallMode , IsExisting, IsUpdReq , IsAdhocAdded
 */
/**Change Tag : INC00073262-RT-PLANT - Use both MIC plant & MIC Number or MIC OBJKEY while filtering the MICs*/
function Wait() {
	//Resolves after 1 s
	return new Promise(r => setTimeout(r, 1));
	//return Promise.resolve();
}

function ExecuteTechObjectUpdateEntity(clientAPI, binding) {
	clientAPI.getPageProxy().setActionBinding(binding);
	return clientAPI.executeAction('/SmartInspections/Actions/TechnicalObjectExGroupSave_UpdateEntity.action');
}

function ExecuteInspCharCreateEntity(pageProxy, binding) {
	pageProxy.setActionBinding(binding);
	//Must return the promised returned by executeAction to keep the chain alive.
	return pageProxy.executeAction('/SmartInspections/Actions/InspectionCharacteristic_CreateEntity.action');
}

function ExecuteInspCharUpdateEntity(pageProxy, binding) {
	pageProxy.setActionBinding(binding);
	//Must return the promised returned by executeAction to keep the chain alive.
	return pageProxy.executeAction('/SmartInspections/Actions/InspectionCharacteristic_UpdateEntity.action');
}

function queryReplace(sQuery, aQueryData) {
	/*	sInspCharQuery = "$filter=(MicPlant eq '{mPlant}' or MicPlant eq '{pPlant}') and IsMic eq true";*/
	/* aQueryData = [{ key : "maintenancePlant" , value : "1234"} ]*/
	var sRepalceKey = "",
		sRepalceValue = "";

	for (var i = 0; i < aQueryData.length; i++) {
		sRepalceKey = "{" + aQueryData[i].key + "}";
		sRepalceValue = aQueryData[i].value;
		sQuery = sQuery.replace(sRepalceKey, sRepalceValue);
	}
	return sQuery;
}
export default function EXGroup_CreateInsp(clientAPI) {
	var nActivityInd = clientAPI.showActivityIndicator("Updating the Inspections for the EX Group. Please wait..");
	//get Page Proxy
	let pageProxy = clientAPI.getPageProxy();
	let currentPage = pageProxy.currentPage;
	let pageClientData = pageProxy.getClientData();

	pageClientData.aExMics = [];
	pageClientData.aExMicsObjectKeys = [];
	pageClientData.aMicMaster = [];
	pageClientData.aTechObjMics = [];

	//variables
	let
	//Ex Group
		oEXGroupListClientData = null,
		oEXGroupListBinding = null,
		//Navigated TechObject Data
		oNavTOClientData = undefined,
		oNavTOBinding = null,
		//Workorder
		oWorkOrderClientData = undefined;

	//Read EX Group value help Press data
	try {
		oEXGroupListClientData = clientAPI.evaluateTargetPath("#Page:EXGroupList/#ClientData");
		oEXGroupListBinding = oEXGroupListClientData.SelectedEXLine;
	} catch (err) {}
	//Read the Navigated TechObject
	try {
		oNavTOClientData = clientAPI.evaluateTargetPath("#Page:TechnicalObjectDetailsList/#ClientData");
		oNavTOBinding = oNavTOClientData.NavigatedTechObject;
	} catch (err) {}

	//Read the Workorder Client Data
	try {
		oWorkOrderClientData = clientAPI.evaluateTargetPath("#Page:WorkOrderDetailsPage/#ClientData");
	} catch (err) {}

	//read the Required data & Save it an Varaible
	var planningPlant = oWorkOrderClientData.SelectedOrderOrig.PlanningPlant;
	var maintenancePlant = oWorkOrderClientData.SelectedOrderOrig.MaintenancePlant;
	var inspectionLot = oWorkOrderClientData.SelectedOrderOrig.InspectionLot;
	var orderNumber = oWorkOrderClientData.SelectedOrderOrig.OrderNumber;
	var orderDescription = oWorkOrderClientData.SelectedOrderOrig.OrderDescription;
	var orderType = oWorkOrderClientData.SelectedOrderOrig.OrderType;
	var equipmentFlag = oWorkOrderClientData.SelectedOrderOrig.EquipmentFlag;
	var cascadedActive = oWorkOrderClientData.SelectedOrderOrig.CascadedActive;

	//Selected EX group
	var sTOEXGrp = oEXGroupListBinding.EXGrp;
	var sTOInspectionSampleNumber = oNavTOBinding.InspectionSampleNumber;
	var sEXNodeNumber = oNavTOBinding.EXNodeNumber;
	var sEXOperationNumber = oNavTOBinding.EXOperationNumber;
	var sEXOperationShortText = "";
	var aMicSkip = [];

	var objectKey = '';
	if (equipmentFlag === 'X') {
		objectKey = oNavTOBinding.Equipment;
	} else {
		objectKey = oNavTOBinding.FunctionalLocationInt;
	}

	// Query Data
	var aQueryData = [{
		"key": "mPlant",
		"value": maintenancePlant
	}, {
		"key": "pPlant",
		"value": planningPlant
	}, {
		"key": "OrdNo",
		"value": orderNumber
	}, {
		"key": "TechObj",
		"value": oNavTOBinding.TechnicalObject
	}];

	/* Update Technical Object */
	var oTechObjUpdatePromise = Promise.resolve();
	oTechObjUpdatePromise = oTechObjUpdatePromise.then(function () {
		//Prepare Data to updated
		var isoDateTime = new Date().toISOString();
		var dateTime = isoDateTime.split(".");
		var time = dateTime[0].split("T");
		//pass Required Value to Update
		oNavTOBinding.ExGrp = oEXGroupListBinding.EXGrp;
		oNavTOBinding.ExGrpDesc = oEXGroupListBinding.EXGrpDesc;
		oNavTOBinding.EXChangedOn = new Date().toISOString();
		oNavTOBinding.EXChangedTime = time[1];
		oNavTOBinding.Status = 'T';
		return ExecuteTechObjectUpdateEntity(clientAPI, oNavTOBinding);
	}).then(Wait);

	/*Read the MICS' master / Proposed -  which matches the Tech object's EX group*/
	var sInspCharQuery = "$filter=(MicPlant eq '{mPlant}' or MicPlant eq '{pPlant}') and IsMic eq true";
	sInspCharQuery = queryReplace(sInspCharQuery, aQueryData);

	var oInspCharQueryPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'InternalCharacteristicDetailsSet', [],
		sInspCharQuery).then(function (results) {

		var aExMics = [];
		var aExMicsObjectKeys = [];
		if (results && results.length > 0) {
			results.forEach(function (value) {
				if (sTOEXGrp === value.CharacteristicValue) {
					aExMicsObjectKeys.push(value.ObjectKey);
					aExMics.push(value);
				}
			});
		} //if
		pageClientData.aExMics = aExMics;
		pageClientData.aExMicsObjectKeys = aExMicsObjectKeys;
		return pageClientData.aExMics; // Do return for a Promise
	});

	/*Read the MIC's Data In Lot and Master Data*/
	var sInspCharMastrQuery = "$filter=(Plant eq '{mPlant}' or Plant eq '{pPlant}')";
	sInspCharMastrQuery = queryReplace(sInspCharMastrQuery, aQueryData);

	var oInspCharMastrPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicMasterSet', [],
		sInspCharMastrQuery).then(function (results) {
		//Prepare Logic
		var aMicProposed = [];
		var aMicNumbersProposed = [];
		var aMicObjectKeysProposed = [];//++ for INC00073262-RT-PLANT
		var aMicNumbersTL = [];
		var aMicTLOnly = [];

		/* Prepare Proposed List*/
		results.forEach(function (oMicLine) {

			//Check if the MIC is Suitable for Proposed
			if (oMicLine.IsProposed === true) {
				//Check if the MICs is Shortlisted for the current EX group
				if (pageClientData.aExMicsObjectKeys.indexOf(oMicLine.ObjectKey) >= 0) {
					//Yes it is proposed
					oMicLine.IsUpdReq = true; // is UPdate Required
					oMicLine.AddInWoSnap = true; // add in Wo Snapshot
					//Push to arrays
					aMicProposed.push(oMicLine);
					aMicNumbersProposed.push(oMicLine.MicNumber);
					aMicObjectKeysProposed.push(oMicLine.ObjectKey);//++ for INC00073262-RT-PLANT
				}
			}
		}); // forEach 

		/* Now check with Lot */

		results.forEach(function (oMicLine) {

			if (oMicLine.InspectionLotNumber === inspectionLot && oMicLine.NodeNumber === sEXNodeNumber /*'00000001'*/ ) {
				if (oMicLine.UnplannedChar === '' || (
						oMicLine.UnplannedCharSampleNumb === sTOInspectionSampleNumber)) {
					//do the Logic - see if it is task list 
					//	Check if the MIC in TL is already in Proposed List
					var indexMicProposed = aMicNumbersProposed.indexOf(oMicLine.MicNumber);
					indexMicProposed = aMicObjectKeysProposed.indexOf(oMicLine.ObjectKey);//++ for INC00073262-RT-PLANT
					//Scenario - 1 - Proposed MIC is already in TL
					if (indexMicProposed >= 0) {
						//Use the Valuses from TL
						oMicLine.IsExisting = true;
						oMicLine.IsUpdReq = false;
						oMicLine.AddInWoSnap = true;
						oMicLine.DeleteFromWoSnap = false;

						aMicProposed[indexMicProposed] = oMicLine;
					} else {
						oMicLine.IsExisting = true;
						oMicLine.IsUpdReq = false;
						if (sTOEXGrp === oMicLine.CharacteristicValue) {
							oMicLine.AddInWoSnap = true;
						}
						aMicNumbersTL.push(oMicLine.MicNumber);
						aMicTLOnly.push(oMicLine);

					}
				} //if
			}
		}); // forEach 2 

		// var aMicUpdate = aMicProposed.concat(aMicTLOnly);
		// var aMicNumbersUpdate = aMicNumbersProposed.concat(aMicNumbersTL);
		var aMicUpdate = aMicProposed;
		var aMicNumbersUpdate = aMicNumbersProposed;
		//Push to Page Client
		pageClientData.aMicUpdate = aMicUpdate;
		pageClientData.aMicNumbersUpdate = aMicNumbersUpdate;

		return pageClientData.aMicUpdate; // Do return for a Promise
	}); //oInspCharMastrPromise 

	/* Read Existing Entries for the technical objectss*/
	var sInspCharDetailsQuery = "$filter=OrderNumber eq '{OrdNo}' and TechnicalObject eq '{TechObj}'";
	sInspCharDetailsQuery = queryReplace(sInspCharDetailsQuery, aQueryData);

	var oInspCharDetailsPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet', [],
		sInspCharDetailsQuery).then(function (results) {
		var aTechObjMics = [];
		if (results && results.length > 0) {
			results.forEach(function (value) {
				aTechObjMics.push(value);
			});
		} //if
		pageClientData.aTechObjMics = aTechObjMics;

		return pageClientData.aTechObjMics; // Do return for a Promise
	});

	/* Do the Updates*/
	Promise.all([oInspCharQueryPromise, oInspCharMastrPromise, oInspCharDetailsPromise, oTechObjUpdatePromise]).then(function (pResults) {

		var equipment = oNavTOBinding.Equipment;
		var equipmentDescription = oNavTOBinding.EquipmentDescription;
		var functionalLocation = oNavTOBinding.FunctionalLocation;
		var functionalLocationDesc = oNavTOBinding.FunctionalLocationDesc;
		var TechnicalObject = '';
		var TechnicalObjectDescription = '';
		if (equipmentFlag === "X") {
			TechnicalObject = equipment;
			TechnicalObjectDescription = equipmentDescription;
		} else {
			TechnicalObject = functionalLocation;
			TechnicalObjectDescription = functionalLocationDesc;
		}
		/* Items to be updated*/
		var aItems = pageClientData.aMicUpdate;
		/* Delete the Existing Items*/
		var aToItems = pageClientData.aTechObjMics;

		//Promise
		var oDelInspPromise = Promise.resolve();

		for (var d = 0; d < aToItems.length; d++) {
			var oDelLine = aToItems[d];
			oDelLine.EXCallMode = "U";
			oDelLine.AddInWoSnap = false;
			oDelLine.DeleteFromWoSnap = true;
			/* Check if it is Under TO  list already*/
			for (var m = 0; m < aItems.length; m++) {
				var oMicItem = aItems[m];
				if (
					oDelLine.InspectionCharacteristicNumb === oMicItem.InspectionCharacteristicNumb && oDelLine.MicNumber === oMicItem.MicNumber &&
					oDelLine.NodeNumber === sEXNodeNumber && oMicItem.AddInWoSnap === true
				) {
					//Add it an Array to Skip the Update in later step
					aMicSkip.push(oMicItem.MicNumber);
					//Change the flags to update
					oDelLine.AddInWoSnap = true;
					oDelLine.DeleteFromWoSnap = false;
					break;
				}

			}
			//call to update the flags
			let oDelBinding = oDelLine;
			oDelInspPromise = oDelInspPromise.then(() => {
				return ExecuteInspCharUpdateEntity(pageProxy, oDelBinding);
			}).then(Wait);

		} // for aToItems

		/* Loop the Items and Update the Items */
		oDelInspPromise.then(function () {

			var sCallMode = "C"; //C - Create , U = Update
			var latestPromiseInsp = Promise.resolve();

			for (var i = 0; i < aItems.length; i++) {
				var oMicLine = aItems[i];
				//Skip MICS which are not need in WOsnap
				if (oMicLine.AddInWoSnap === false) {
					continue;
				}
				//Skip the MICs which is already Updated in above Update call
				if (aMicSkip.indexOf(oMicLine.MicNumber) >= 0) {
					continue;
				}

				//build object binding
				var newMicObject = {
						EXCallMode: "C",
						AddInWoSnap: true,
						DeleteFromWoSnap: false,
						CharacteristicValue1: oMicLine.CharacteristicValue1,
						CharacteristicValue1Desc: oMicLine.CharacteristicValue1Desc,
						CharacteristicValue2: oMicLine.CharacteristicValue2,
						CharacteristicValue2Desc: oMicLine.CharacteristicValue2Desc,
						CodeGroup: oMicLine.CodeGroup,
						//DateResult: Null,
						DateValueMaintained: '',
						DefectCode: '',
						DefectCodeGroup: '',
						DescopedBy: '',
						//DescopedOn: Null,
						//DescopedTime: Null,
						Equipment: equipment,
						EquipmentDescription: equipmentDescription,
						EquipmentFlag: equipmentFlag,
						FixedValuesResult: '',
						FunctionalLocation: functionalLocation,
						FunctionalLocationDesc: functionalLocationDesc,
						Index: 1,
						InspectionCharacteristicNumb: oMicLine.InspectionCharacteristicNumb,
						InspectionLotNumber: inspectionLot,
						InspectionSampleNumber: sTOInspectionSampleNumber, //""
						InspectionShortText: '',
						InspectionTypes: oMicLine.InspectionTypes,
						IsAdhocAdded: true,
						IsDescopeUpdated: false,
						IsExisting: oMicLine.IsExisting ? true : false,
						IsUpdReq: oMicLine.IsUpdReq ? true : false,
						IsUpdSuccess: oMicLine.IsUpdSuccess ? true : false,
						ListCounter: 0,
						LongText: '',
						LowerLimit: oMicLine.LowerLimitSi,
						LowerPlausibleLimit: oMicLine.LowerPlausibleLimitSi,
						MaxIndex: 0,
						MicDescopeDesc: '',
						MicDescopeType: '',
						MicLongText: '',
						MicNumber: oMicLine.MicNumber,
						MicPlant: oMicLine.MicPlant,
						MicShortText: oMicLine.MicShortText,
						MicType: oMicLine.MicType,
						MultipleSample: '',
						NodeNumber: sEXNodeNumber, //'00000001',
						NotFoundAdhoc: false,
						NumberOfCharacters: oMicLine.NumberOfCharacters,
						NumberOfDecimals: oMicLine.NumberOfDecimals,
						NumberOfSamples: oMicLine.NumberOfSamples,
						OperationNumber: sEXOperationNumber, //"0010",
						OperationShortText: sEXOperationShortText, //"Operation Text",
						OrderDescription: orderDescription,
						OrderNumber: orderNumber,
						OrderType: orderType,
						PlausibleMessageType: '',
						Result: '',
						SampleCriteria: oMicLine.SampleCriteria,
						SampleReading1: '',
						SampleReading10: '',
						SampleReading11: '',
						SampleReading12: '',
						SampleReading13: '',
						SampleReading14: '',
						SampleReading15: '',
						SampleReading16: '',
						SampleReading17: '',
						SampleReading18: '',
						SampleReading19: '',
						SampleReading2: '',
						SampleReading20: '',
						SampleReading3: '',
						SampleReading4: '',
						SampleReading5: '',
						SampleReading6: '',
						SampleReading7: '',
						SampleReading8: '',
						SampleReading9: '',
						SamplingProcedure: oMicLine.SamplingProcedure,
						SelectedSet: oMicLine.SelectedSet,
						SortNumber: '',
						Status: oMicLine.Status,
						TargetValue: oMicLine.TargetValueSi,
						TechnicalObject: TechnicalObject,
						TechnicalObjectDescription: TechnicalObjectDescription,
						UnitOfMeasure: oMicLine.UnitOfMeasure,
						UpperLimit: oMicLine.UpperLimitSi,
						UpperPlausibleLimit: oMicLine.UpperPlausibleLimitSi,
						Version: oMicLine.Version
					}
					//Create Mode
				let newMicObjectBinding = newMicObject;
				if (sCallMode === "C") {
					// Do a Create call to Update the shortlisted MICs in LOT & WO snapshot
					latestPromiseInsp = latestPromiseInsp.then(() => {
						return ExecuteInspCharCreateEntity(pageProxy, newMicObjectBinding);
					}).then(Wait);

				} //if sCallMode === "C"
			} //for
			//After all Updates Dismiss the Progress Indicator & close the Page
			latestPromiseInsp.then(function () {
				clientAPI.dismissActivityIndicator(nActivityInd);
				return clientAPI.executeAction('/SmartInspections/Actions/EXListClose.action');
			});
		});

	}); //Promise.all
} //EXGroup_CreateInsp