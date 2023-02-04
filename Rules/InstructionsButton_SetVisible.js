export default function InstructionsButton_SetVisible(clientAPI) {
	var binding = clientAPI.getPageProxy().getBindingObject();
	var micNumber = binding.MicNumber;
	var micPlant = binding.MicPlant;
	var version = binding.Version;
	//var returnVal = false;
	//return returnVal;
	var inspCharMastrQueryOptions = "$filter=MicNumber eq '" + micNumber + "' and MicPlant eq '" + micPlant + "' and Version eq '" + version +
		"'&$top=1";
	return clientAPI.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicMasterSet', [], inspCharMastrQueryOptions).then(
		function (results) {
			var longTextLines = '';
			var isVisible = false;
			if (results && results.length > 0) {
				results.forEach(function (value) {
					var isLtExists = value.IsLtExists;
					if (isLtExists === true) {
						isVisible = true;
					}
				});
			}
			return isVisible;
		});
}