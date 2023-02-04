export default function Instructions_SetValue(clientAPI) {
	var binding = clientAPI.getPageProxy().getBindingObject();
	var micNumber = binding.MicNumber;
	var micPlant = binding.MicPlant;
	var version = binding.Version;

	var inspCharMastrQueryOptions = "$filter=MicNumber eq '" + micNumber + "' and MicPlant eq '" + micPlant + "' and Version eq '" + version +
		"'&$top=1";
	return clientAPI.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicMasterSet', [],
		inspCharMastrQueryOptions).then(
		function (results) {
			var longTextLines = '';
			if (results && results.length > 0) {
				results.forEach(function (value) {
					var longTextStr = value.LongTextStr;
					var longTextArray = longTextStr.split("new_line");
					if (longTextArray.length > 0) {
						for (var i = 0; i < longTextArray.length; i++) {
							longTextLines = longTextLines + longTextArray[i] + '\n';
						}
					}
				});
			}
			return longTextLines;
		});
}