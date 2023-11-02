/**Change Tag : CHG00074716-CR-BRQ002 - Add Plant Section & Location in filter */
export default function AdHocTechnicalObjectListPage_Query(context) {
	var binding = context.binding;
	var orderNumber = binding.OrderId;
	let pageProxy = context.getPageProxy();
	let myListPageClientData = '';
	let pageClientData = pageProxy.getClientData();

	var techObjQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "'";

	try {
		myListPageClientData = context.evaluateTargetPath("#Page:WorkOrderDetailsPage/#ClientData");
	} catch (err) { }

	var maintenancePlant = myListPageClientData.SelectedOrderOrig.MaintenancePlant;
	var planningPlant = myListPageClientData.SelectedOrderOrig.PlanningPlant;
	var equipmentFlag = myListPageClientData.SelectedOrderOrig.EquipmentFlag;
	/*B.O.A for CHG00074716-CR-BRQ002*/
	var sPlantSection = myListPageClientData.SelectedOrderOrig.PlantSection;
	var sLocation = myListPageClientData.SelectedOrderOrig.Location;

	pageClientData.isPlantSectionActive = false;
	pageClientData.isLocationActive = false;
	/*B.O.Comment for CHG00074716-CR-BRQ002*/
	/*	return context.read('/SmartInspections/Services/SAM.service', 'TechnicalObjectDetailsSet', [], techObjQueryOptions).then(
			function (results) {
				var finalQuery = "$filter=MaintenancePlant eq '" + maintenancePlant + "' and EquipmentFlag eq '" + equipmentFlag +
					"' and IsProposed eq true";
	
				if (results && results.length > 0) {
					results.forEach(function (value) {
						finalQuery = finalQuery + " and TechnicalObject ne '" + value.TechnicalObject + "'";
					});
				}
				return finalQuery + "&$orderby=TechnicalObject";
			});*/

	/*E.O.Comment for CHG00074716-CR-BRQ002*/
	/*B.O.A for CHG00074716-CR-BRQ002*/
	var sparameterQueryOptions =
		"$filter=ModuleName eq 'SMART_INSP_TECH_DEPENDANCIES' and Parameter1 eq 'ADHOC_FILTER' and ActiveFlag eq 'X'";
	var oParameterPromise = context.read('/SmartInspections/Services/SAM.service', 'ParameterDetailsSet', [], sparameterQueryOptions).then(
		function (results) {
			var sQuery = "";

			if (results && results.length > 0) {
				results.forEach(function (value) {
					if (value.Parameter2 === "PLANT_SECTION") {
						pageClientData.isPlantSectionActive = true;
					} else if (value.Parameter2 === "USER_STATUS") {
						pageClientData.isLocationActive = true;
					}

				});
			}
			//Main Filters
			sQuery = "MaintenancePlant eq '" + maintenancePlant + "' and EquipmentFlag eq '" + equipmentFlag +
				"' and IsProposed eq true";
			// Plant Section & Location Filter based on Flags
			if (pageClientData.isPlantSectionActive) {
				sQuery = sQuery + " and PlantSection eq '" + sPlantSection + "'";
			}
			if (pageClientData.isLocationActive) {
				sQuery = sQuery + " and Location eq '" + sLocation + "'";
			}
			sQuery = "$filter=( " + sQuery + " )";
			return sQuery;
		});

	var oTechObjPromise = context.read('/SmartInspections/Services/SAM.service', 'TechnicalObjectDetailsSet', [], techObjQueryOptions).then(
		function (results) {
			var finalQuery = "";
			//TechObjs to be Excluded
			if (results && results.length > 0) {
				results.forEach(function (value) {
					if (finalQuery === "") {
						finalQuery = "TechnicalObject ne '" + value.TechnicalObject + "'";
					} else {
						finalQuery = finalQuery + " and TechnicalObject ne '" + value.TechnicalObject + "'";
					}
				});
			}
			finalQuery = "( " + finalQuery + " )";
			return finalQuery;
		});

	return Promise.all([oTechObjPromise, oParameterPromise]).then(function (pResults) {

		var sFinalQuery = "";
		var sfilterstrTechObj = pResults[0];
		var sfilterStrParam = pResults[1];
		sFinalQuery = sfilterstrTechObj;

		//Combine Final String
		sFinalQuery = sfilterStrParam + " and " + sfilterstrTechObj;
		sFinalQuery = sFinalQuery + "&$orderby=TechnicalObject";
		//Return it
		return sFinalQuery;

	});
	/*E.O.A for CHG00074716-CR-BRQ002*/
}