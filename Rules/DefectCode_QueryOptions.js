// export default function DefectCode_QueryOptions(sectionedTableProxy) {
// 	var technicalObject = sectionedTableProxy.binding.TechnicalObject;
// 	var queryOptions = "$filter=TechnicalObject eq '" + technicalObject + "'&$orderby=DefCode";
// 	return queryOptions;
// }
//Start of AM001
export default function DefectCode_QueryOptions(clientAPI) {
	//Tech Object page
	var listPageClientData = clientAPI.evaluateTargetPath("#Page:TechnicalObjectDetailsList/#ClientData");
	var oTechbinding = listPageClientData.NavigatedTechObject;
	// Catalog Profile at Tech object level
	var sCatalogProfile = oTechbinding.CatalogProfile;
	//Build Query string
	var sQuery = "$filter=CatalogProfile eq '" + sCatalogProfile + "'";
	//Read the Catalog
	return clientAPI.read('/SmartInspections/Services/SAM.service', 'CatalogProfileDetailsSet', [],
		sQuery).then(function (results) {
			//Build the Code Groups
			var aCodeGroups = [];
			if (results && results.length > 0) {
				results.forEach(function (value) {
					aCodeGroups.push(value.DefectCodeGroup);
				});
			} //if 
			//prepare  Filter Lines
			var aCodeGroupsFlines = [];
			for (var i = 0; i < aCodeGroups.length; i++) {
				var sLine = "DefCodeGroup eq '" + aCodeGroups[i] + "'";
				aCodeGroupsFlines.push(sLine);
			}
			//Build Final Filter String
			var sGroups = aCodeGroupsFlines.join(" or ");
			var sFilterQuery = "$filter=(" + sGroups + ")&$orderby=DefCode";
			return sFilterQuery;
		});//then

}
//End of AM001
