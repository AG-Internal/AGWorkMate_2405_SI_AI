/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function InstructionsAccessoryIcon(clientAPI) {

    var binding = clientAPI.binding;
    var micNumber = binding.MicNumber;
    var micPlant = binding.MicPlant;
    var version = binding.Version;

    var inspCharMastrQueryOptions = "$filter=MicNumber eq '" + micNumber + "' and MicPlant eq '" + micPlant + "' and Version eq '" + version +
        "'&$top=1";
    return clientAPI.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicMasterSet', [], inspCharMastrQueryOptions).then(
        function (results) {
            var longTextLines = '';
            var sIcon = "";
            if (results && results.length > 0) {
                results.forEach(function (value) {
                    var isLtExists = value.IsLtExists;
                    if (isLtExists === true) {
                        sIcon = "sap-icon://message-information";
                    }
                });
            }
            return sIcon;
        });
}
