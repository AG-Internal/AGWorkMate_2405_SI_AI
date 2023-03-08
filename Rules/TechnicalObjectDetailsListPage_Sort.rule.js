export default function TechnicalObjectDetailsListPage_Sort(context) {
	let pageProxy = context.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	let wo = context.binding.OrderId;
	var finalQuery = "$filter=OrderNumber eq '" + wo + "'&$orderby=SortNumber, ListCounter";
	var inspCharQueryOptions = "$filter=OrderNumber eq '" + wo + "'";
	//B.O.Comment for D048
	/*return context.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet', [], inspCharQueryOptions).then(
		function (results) {
			var inspCharObjects = [];
			if (results && results.length > 0) {
				results.forEach(function (value) {
					inspCharObjects.push(value);
				});
			}
			pageClientData.InspCharObjects = inspCharObjects;
			return finalQuery;
		});*/
	//E.O.Comment for D048
	//B.O.A for D048
	//initialize Action variable
	if (!pageClientData.Action) {
		pageClientData.Action = "";//Set Action Empty
		//variable Format
		pageClientData.InspCharObjects = [{ "TechnicalObject": "", DeleteFromWoSnap: false }];
	}

	if (pageClientData.Action === "") {
		pageClientData.Action = "SETTIMEOUT";//Set the Timeout
	} else if (pageClientData.Action === "REDRAWED") {
		//if Redrawed reset the Action
		pageClientData.Action = "";
	}
	if (pageClientData.Action === "SETTIMEOUT") {
		//Time out will be called after returning the Query
		//set it to Inprogess So it know we are alreadty doing
		pageClientData.Action = "INPROCESS";
		setTimeout(() => {
			return context.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet', [], inspCharQueryOptions).then(
				function (results) {
					var inspCharObjects = [];
					if (results && results.length > 0) {
						results.forEach(function (value) {
							inspCharObjects.push(value);
						});
					}
					pageClientData.InspCharObjects = inspCharObjects;
					pageClientData.Action = "REDRAWED"; // Set it once Redrawed
					context.redraw();
					return context.getPageProxy().executeAction("/SmartInspections/Actions/TechObjectDetailList_AllLoaded.action");
					
				}
			);

		}, 200);
	}

	//return the Query
	return finalQuery;
	//E.O.A for D048
}