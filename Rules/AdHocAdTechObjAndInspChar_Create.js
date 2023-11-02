/* Change Tag : SIV2203, Date:1-Nov-22, Description: EX Group, 
Changes: EX Related Logic
*/
/*--------------------------------------------------------------------*
* Change Tag    :  D062 - Catalog Profile for ADHOC
*--------------------------------------------------------------------*/
/**Change Tag : INC00073262-RT-PLANT - Use both MIC plant & MIC Number or MIC OBJKEY while filtering the MICs*/
/**Change Tag : CHG00074716-CR-BRQ002 - add FLoc Internal value*/
function ExecuteTechObjCreateEntity(pageProxy, binding) {
	pageProxy.setActionBinding(binding);
	//Must return the promised returned by executeAction to keep the chain alive.
	return pageProxy.executeAction('/SmartInspections/Actions/TechnicalObject_CreateEntity.action');
}

function ExecuteInspCharCreateEntity(pageProxy, binding) {
	pageProxy.setActionBinding(binding);
	//Must return the promised returned by executeAction to keep the chain alive.
	return pageProxy.executeAction('/SmartInspections/Actions/InspectionCharacteristic_CreateEntity.action');
}

function Wait() {
	return new Promise(r => setTimeout(r, 1));
	//return Promise.resolve();
}

export default function AdHocAdTechObjAndInspChar_Create(clientAPI) {
	let pageProxy = clientAPI.getPageProxy();
	let currentPage = pageProxy.currentPage;
	let currentPageString = currentPage.toString()
	let pageClientData = pageProxy.getClientData();
	let adHocOperationList = '';
	let adHocTechnicalObjectList = '';
	let WorkOrderDetailsPage = '';

	try {
		adHocTechnicalObjectList = clientAPI.evaluateTargetPath("#Page:AdHocTechnicalObjectList/#ClientData");
	} catch (err) { }
	var adHocTechnicalObject = adHocTechnicalObjectList.AdHocTechnicalObject;
	var adHocTechnicalObjectDesc = adHocTechnicalObjectList.AdHocTechnicalObjectDesc;
	var adHocEquipmentNumber = adHocTechnicalObjectList.AdHocEquipmentNumber;
	var adHocFunctionalLocation = adHocTechnicalObjectList.AdHocFunctionalLocation;
	var CatalogProfile = adHocTechnicalObjectList.CatalogProfile;//++ for D062

	if (currentPageString.indexOf("AdHocTechnicalObjectList") !== -1) {
		var adHocNodeNumber = adHocTechnicalObjectList.AdHocNodeNumber;
		var adHocOperationNumber = adHocTechnicalObjectList.AdHocOperationNumber;
		var adHocOperationShortText = adHocTechnicalObjectList.AdHocOperationShortText;
	} else if (currentPageString.indexOf("AdHocOperationNumberList") !== -1) {
		try {
			adHocOperationList = clientAPI.evaluateTargetPath("#Page:AdHocOperationNumberList/#ClientData");
		} catch (err) { }
		var adHocNodeNumber = adHocOperationList.AdHocNodeNumber;
		var adHocOperationNumber = adHocOperationList.AdHocOperationNumber;
		var adHocOperationShortText = adHocOperationList.AdHocOperationShortText;
	}

	try {
		WorkOrderDetailsPage = clientAPI.evaluateTargetPath("#Page:WorkOrderDetailsPage/#ClientData");
	} catch (err) { }
	var planningPlant = WorkOrderDetailsPage.SelectedOrderOrig.PlanningPlant;
	var maintenancePlant = WorkOrderDetailsPage.SelectedOrderOrig.MaintenancePlant;
	var inspectionLot = WorkOrderDetailsPage.SelectedOrderOrig.InspectionLot;
	var orderNumber = WorkOrderDetailsPage.SelectedOrderOrig.OrderNumber;
	var orderDescription = WorkOrderDetailsPage.SelectedOrderOrig.OrderDescription;
	var orderType = WorkOrderDetailsPage.SelectedOrderOrig.OrderType;
	var equipmentFlag = WorkOrderDetailsPage.SelectedOrderOrig.EquipmentFlag;
	var cascadedActive = WorkOrderDetailsPage.SelectedOrderOrig.CascadedActive;
	var EXActive = WorkOrderDetailsPage.SelectedOrderOrig.EXActive; //++SIV2203

	var objectKey = '';
	if (equipmentFlag === 'X') {
		objectKey = adHocEquipmentNumber;
	} else {
		objectKey = adHocFunctionalLocation;
	}
	/*B.O.A by RB for SIV2203*/
	// Read the Ex Group List - to read the Description
	var oEXGroupQuery = "";
	var oEXGroupListPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'EXGroupSet', [],
		oEXGroupQuery).then(
			function (results) {
				var aEXGroupList = [];
				if (results && results.length > 0) {
					results.forEach(function (value) {
						aEXGroupList.push(value);
					});
				}
				pageClientData.aEXGroupList = aEXGroupList;
				return pageClientData.aEXGroupList;
			});
	/*E.O.A by RB for SIV2203*/

	var internalTechObjQuery = "$filter=substringof('" + objectKey + "', ObjectKey) and IsTechObj eq true";
	var internalTechObjPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'InternalCharacteristicDetailsSet', [],
		internalTechObjQuery).then(
			function (results) {
				var characteristicValue = [];
				if (results && results.length > 0) {
					results.forEach(function (value) {
						characteristicValue.push(value.CharacteristicValue);
					});
				}
				pageClientData.CharacteristicValueTechObj = characteristicValue;
				return pageClientData.CharacteristicValueTechObj;
			});

	return Promise.all([internalTechObjPromise, oEXGroupListPromise /*++SIV2203*/]).then(function (counts) {

		//	var internalInspCharQuery = "$filter=MicPlant eq '" + maintenancePlant + "' and IsMic eq true";"-- for INC00073262-RT-PLANT
		//B.O.A for INC00073262-RT-PLANT
		var internalInspCharQuery = "$filter=(MicPlant eq '" + maintenancePlant + "' or MicPlant eq '" + planningPlant + "') and IsMic eq true";
		//E.O.A for INC00073262-RT-PLANT
		var internalInspCharPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'InternalCharacteristicDetailsSet', [],
			internalInspCharQuery).then(
				function (results) {
					var objectKeys = [];
					var internalCharInspChar = [];
					if (results && results.length > 0) {
						results.forEach(function (value) {
							if (pageClientData.CharacteristicValueTechObj.includes(value.CharacteristicValue)) {
								//if (value.CharacteristicValue === pageClientData.CharacteristicValueTechObj) {
								objectKeys.push(value.ObjectKey);
								internalCharInspChar.push(value);
							}
						});
					}
					pageClientData.InternalCharInspChar = internalCharInspChar;
					pageClientData.ObjectKeys = objectKeys;
					return pageClientData.InternalCharInspChar;
				});

		return Promise.all([internalInspCharPromise]).then(function (counts) {

			//	var inspCharMastrQueryOptions = "$filter=Plant eq '" + maintenancePlant + "'";//-- for INC00073262-RT-PLANT
			//B.O.A for INC00073262-RT-PLANT
			var inspCharMastrQueryOptions = "$filter=Plant eq '" + maintenancePlant + "' or Plant eq '" + planningPlant + "'";
			//E.O.A for INC00073262-RT-PLANT
			var inspCharMasterPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicMasterSet', [],
				inspCharMastrQueryOptions).then(
					function (results) {
						var micProposed = [];
						var micTLOnly = [];
						var micNumbersProposed = [];
						var aMicObjectKeysProposed = [];//++ for INC00073262-RT-PLANT
						var micNumbersTL = [];
						if (results && results.length > 0) {
							results.forEach(function (value) {
								//if (value.Plant === maintenancePlant && value.IsProposed === true) { //-- for INC00073262-RT-PLANT
								if ((value.Plant === maintenancePlant || value.Plant === planningPlant) && value.IsProposed === true) { // ++ for INC00073262-RT-PLANT
									var index = pageClientData.ObjectKeys.indexOf(value.ObjectKey);
									if (pageClientData.ObjectKeys.indexOf(value.ObjectKey) !== -1) {
										if (pageClientData.CharacteristicValueTechObj.includes(pageClientData.InternalCharInspChar[index].CharacteristicValue)) {
											//if (pageClientData.CharacteristicValueTechObj === pageClientData.InternalCharInspChar[index].CharacteristicValue) {
											value.IsUpdReq = true;
											value.AddInWoSnap = true;
											micProposed.push(value);
											micNumbersProposed.push(value.MicNumber);
											aMicObjectKeysProposed.push(value.ObjectKey);//++ for INC00073262-RT-PLANT
										}
									}
								}
							});

							results.forEach(function (value) {
								if (value.InspectionLotNumber === inspectionLot && value.UnplannedChar === '' && value.NodeNumber === adHocNodeNumber) {
									var index = micNumbersProposed.indexOf(value.MicNumber);
									index = aMicObjectKeysProposed.indexOf(value.ObjectKey);//++ for INC00073262-RT-PLANT
									if (micNumbersProposed.indexOf(value.MicNumber) !== -1) {
										micProposed[index] = value;
										micProposed[index].IsExisting = true;
										micProposed[index].IsUpdReq = false;
										micProposed[index].AddInWoSnap = true;
										micProposed[index].InspectionCharacteristicNumb = value.InspectionCharacteristicNumb;
										micProposed[index].Version = value.Version;
									} else {
										value.IsExisting = true;
										value.IsUpdReq = false;
										if (pageClientData.CharacteristicValueTechObj.includes(pageClientData.CharacteristicValueInspChar)) {
											//if (pageClientData.CharacteristicValueTechObj === pageClientData.CharacteristicValueInspChar) {
											value.AddInWoSnap = true;
										}
										micNumbersTL.push(value.MicNumber);
										micTLOnly.push(value);
									}
								}
							});

							var micUpdate = micProposed.concat(micTLOnly);
							var micNumbersUpdate = micNumbersProposed.concat(micNumbersTL);
							pageClientData.MicUpdate = micUpdate;
						}
						return pageClientData.MicUpdate;
					});

			return Promise.all([inspCharMasterPromise]).then(function (counts) {

				var techObjQuery = "$filter=OrderNumber eq '" + orderNumber + "'&$top=1";
				var techObjPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'TechnicalObjectDetailsSet', [],
					techObjQuery).then(
						function (results) {
							if (results && results.length > 0) {
								results.forEach(function (value) {
									pageClientData.InspectionTypeOrg = value.InspectionTypeOrg;
									pageClientData.InspectionTypeOrgDesc = value.InspectionTypeOrgDesc;
								});
							}
							return pageClientData.InspectionTypeOrg;
						});

				return Promise.all([techObjPromise]).then(function (counts) {

					var inspectionCharQuery = "$filter=OrderNumber eq '" + orderNumber + "' and InspectionLotNumber eq '" + inspectionLot + "'";
					var inspectionCharPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet', [],
						inspectionCharQuery).then(
							function (results) {
								if (results && results.length > 0) {
									for (var i = 0; i < pageClientData.MicUpdate.length; i++) {
										if (pageClientData.MicUpdate[i].IsExisting === true) {
											results.forEach(function (value) {
												if (value.InspectionLotNumber === inspectionLot && value.MicNumber === pageClientData.MicUpdate[i].MicNumber 
													&& value.MicPlant === pageClientData.MicUpdate[i].MicPlant //++ for INC00073262-RT-PLANT
													&& value.Version === pageClientData.MicUpdate[i].Version ) {
													pageClientData.MicUpdate[i].CharacteristicValue1 = value.CharacteristicValue1;
													pageClientData.MicUpdate[i].CharacteristicValue1Desc = value.CharacteristicValue1Desc;
													pageClientData.MicUpdate[i].CharacteristicValue2 = value.CharacteristicValue2;
													pageClientData.MicUpdate[i].CharacteristicValue2Desc = value.CharacteristicValue2Desc;
													pageClientData.MicUpdate[i].InspectionTypes = value.InspectionTypes;
												}
											});
										}
									}
								}
								return pageClientData.MicUpdate;
							});

					return Promise.all([inspectionCharPromise]).then(function (counts) {
						var equipment = '';
						var equipmentDescription = '';
						var functionalLocation = '';
						var functionalLocationDesc = '';
						/*B.O.A by RB for SIV2203*/
						var sEXGrp = "";
						var sEXGrpDesc = "";
						/*E.O.A by RB for SIV2203*/
						var latestPromise = Promise.resolve();

						if (equipmentFlag === 'X') {
							equipment = adHocTechnicalObject;
							equipmentDescription = adHocTechnicalObjectDesc;
						} else {
							functionalLocation = adHocTechnicalObject;
							functionalLocationDesc = adHocTechnicalObjectDesc;
						}

						if (cascadedActive !== 'X') {
							pageClientData.InspectionTypeOrg = '';
							pageClientData.InspectionTypeOrgDesc = '';
						}
						/*B.O.A by RB for SIV2203*/
						//if EX is active - update the EX group in Adhoc Object
						var aEXList = pageClientData.aEXGroupList;
						sEXGrp = "";
						sEXGrpDesc = "";
						if (EXActive === "X") {
							// pick the First EX group of Techobject
							sEXGrp = pageClientData.CharacteristicValueTechObj[0];
							if (aEXList.length > 0) {
								//Read desc
								for (var i = 0; i < aEXList.length; i++) {
									if (sEXGrp === aEXList[i].EXGrp) {
										sEXGrpDesc = aEXList[i].EXGrpDesc;
										break;
									}
								}
							} else {
								//if no Desc , pass the Value as Descs
								sEXGrpDesc = sEXGrp;
							}
						}
						/*E.O.A by RB for SIV2203*/

						var isoDateTime = new Date().toISOString();
						var dateTime = isoDateTime.split(".");
						var time = dateTime[0].split("T");

						latestPromise = latestPromise.then(() => {
							var newTechnicalObject = {
								AbcIndicator: '',
								AdhocFlag: 'X',
								ChangedBy: '',
								ChangedByAlias: '',
								ChangedOn: new Date().toISOString(),
								ChangedTime: time[1],
								DescopedBy: '',
								DescopedByAlias: '',
								DescopeType: '',
								DescopeTypeDesc: '',
								Equipment: equipment,
								EquipmentDescription: equipmentDescription,
								EquipmentFlag: equipmentFlag,
								FunctionalLocationInt: adHocFunctionalLocation, //++CHG00074716-CR-BRQ002
								FunctionalLocation: functionalLocation,
								FunctionalLocationDesc: functionalLocationDesc,
								InspectionLotNumber: inspectionLot,
								InspectionSampleNumber: '',
								InspectionType: pageClientData.InspectionTypeOrg,
								InspectionTypeDesc: pageClientData.InspectionTypeOrgDesc,
								InspectionTypeOrg: pageClientData.InspectionTypeOrg,
								InspectionTypeOrgDesc: pageClientData.InspectionTypeOrgDesc,
								IsAdhocAdded: true,
								LastInspLotNumber: '',
								LastInspType: '',
								LastInspTypeDesc: '',
								LastOrderNumber: '',
								ListCounter: 0,
								NodeNumber: adHocNodeNumber,
								OperationNumber: adHocOperationNumber,
								OrderDescription: orderDescription,
								OrderNumber: orderNumber,
								OrderType: orderType,
								SaveMode: '',
								SelectedToSave: '',
								SortNumber: '',
								Status: 'A',
								TechnicalObject: adHocTechnicalObject,
								TotalFail: 0,
								TotalFix: 0,
								TotalPass: 0,
								TotalPending: 0,
								UsageDecisionCode: '',
								/*B.O.A by RB for SIV2203*/
								ExGrp: sEXGrp,
								ExGrpDesc: sEXGrpDesc,
								ExGrpOrg: sEXGrp,
								ExGrpOrgDesc: sEXGrpDesc,
								EXNodeNumber: adHocNodeNumber,
								EXOperationNumber: adHocOperationNumber,
								/*E.O.A by RB for SIV2203*/
								/*B.O.A for D062*/
								EXChangedOn: new Date().toISOString(),
								EXChangedTime: time[1],
								CatalogProfile: CatalogProfile
								/*B.O.A for D062*/
							}

							return ExecuteTechObjCreateEntity(pageProxy, newTechnicalObject);
						}).then(Wait);

						return latestPromise.then(function () {
							var latestPromiseInsp = Promise.resolve();
							pageClientData.NewMicObjects = pageClientData.MicUpdate.filter(element => element.AddInWoSnap === true);

							for (var i = 0; i < pageClientData.NewMicObjects.length; i++) {

								var newMicObject = {
									AddInWoSnap: pageClientData.NewMicObjects[i].AddInWoSnap ? true : false,
									CharacteristicValue1: pageClientData.NewMicObjects[i].CharacteristicValue1,
									CharacteristicValue1Desc: pageClientData.NewMicObjects[i].CharacteristicValue1Desc,
									CharacteristicValue2: pageClientData.NewMicObjects[i].CharacteristicValue2,
									CharacteristicValue2Desc: pageClientData.NewMicObjects[i].CharacteristicValue2Desc,
									CodeGroup: pageClientData.NewMicObjects[i].CodeGroup,
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
									InspectionCharacteristicNumb: pageClientData.NewMicObjects[i].InspectionCharacteristicNumb,
									InspectionLotNumber: inspectionLot,
									InspectionSampleNumber: '',
									InspectionShortText: '',
									InspectionTypes: pageClientData.NewMicObjects[i].InspectionTypes,
									IsAdhocAdded: true,
									IsDescopeUpdated: false,
									IsExisting: pageClientData.NewMicObjects[i].IsExisting ? true : false,
									IsUpdReq: pageClientData.NewMicObjects[i].IsUpdReq ? true : false,
									IsUpdSuccess: pageClientData.NewMicObjects[i].IsUpdSuccess ? true : false,
									ListCounter: 0,
									LongText: '',
									LowerLimit: pageClientData.NewMicObjects[i].LowerLimitSi,
									LowerPlausibleLimit: pageClientData.NewMicObjects[i].LowerPlausibleLimitSi,
									MaxIndex: 0,
									MicDescopeDesc: '',
									MicDescopeType: '',
									MicLongText: '',
									MicNumber: pageClientData.NewMicObjects[i].MicNumber,
									MicPlant: pageClientData.NewMicObjects[i].MicPlant,
									MicShortText: pageClientData.NewMicObjects[i].MicShortText,
									MicType: pageClientData.NewMicObjects[i].MicType,
									MultipleSample: '',
									NodeNumber: adHocNodeNumber,
									NotFoundAdhoc: false,
									NumberOfCharacters: pageClientData.NewMicObjects[i].NumberOfCharacters,
									NumberOfDecimals: pageClientData.NewMicObjects[i].NumberOfDecimals,
									NumberOfSamples: pageClientData.NewMicObjects[i].NumberOfSamples,
									OperationNumber: adHocOperationNumber,
									OperationShortText: adHocOperationShortText,
									OrderDescription: orderDescription,
									OrderNumber: orderNumber,
									OrderType: orderType,
									PlausibleMessageType: '',
									Result: '',
									SampleCriteria: pageClientData.NewMicObjects[i].SampleCriteria,
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
									SamplingProcedure: pageClientData.NewMicObjects[i].SamplingProcedure,
									SelectedSet: pageClientData.NewMicObjects[i].SelectedSet,
									SortNumber: '',
									Status: pageClientData.NewMicObjects[i].Status,
									TargetValue: pageClientData.NewMicObjects[i].TargetValueSi,
									TechnicalObject: adHocTechnicalObject,
									TechnicalObjectDescription: adHocTechnicalObjectDesc,
									UnitOfMeasure: pageClientData.NewMicObjects[i].UnitOfMeasure,
									UpperLimit: pageClientData.NewMicObjects[i].UpperLimitSi,
									UpperPlausibleLimit: pageClientData.NewMicObjects[i].UpperPlausibleLimitSi,
									Version: pageClientData.NewMicObjects[i].Version,
									/*B.O.A by RB for SIV2203*/
									EXCallMode: "",
									DeleteFromWoSnap: false,
									/*E.O.A by RB for SIV2203*/
								}
								//alert(Object.entries(newMicObject));
								let newMicObjectBinding = newMicObject;
								latestPromiseInsp = latestPromiseInsp.then(() => {
									return ExecuteInspCharCreateEntity(pageProxy, newMicObjectBinding);
								}).then(Wait);
							}
							return latestPromiseInsp.then(function () {
								return pageProxy.executeAction(
									'/SmartInspections/Actions/InspectionCharacteristic_CreateEntity_SuccessMessage.action');
							}.bind(pageProxy));

						}.bind(pageProxy));
					});
				});
			});
		});
	});
}