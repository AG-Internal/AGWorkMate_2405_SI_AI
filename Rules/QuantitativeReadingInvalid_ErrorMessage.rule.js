var clientAPI;

export default function QuantitativeReadingInvalid_ErrorMessage(clientAPI) {
	var numberOfCharacters = clientAPI.getPageProxy().getBindingObject().NumberOfCharacters;
	var numberOfDecimals = clientAPI.getPageProxy().getBindingObject().NumberOfDecimals;
	numberOfCharacters = Number(numberOfCharacters);
	numberOfDecimals = Number(numberOfDecimals);
	var numberOfCharactersFinal = numberOfCharacters - numberOfDecimals;

	var message = "Please enter a reading with " + numberOfCharactersFinal + " character(s) and " + numberOfDecimals + " decimal(s).";
	return message;

}