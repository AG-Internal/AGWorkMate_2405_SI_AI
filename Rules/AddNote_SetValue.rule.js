export default function AddNote_SetValue(clientAPI) {
	var longTextLines = '';
	var longText = clientAPI.getPageProxy().getBindingObject().LongText;
	var longTextArray = longText.split("new_line");

	if (longTextArray.length > 0) {
		for (var i = 0; i < longTextArray.length; i++) {
			longTextLines = longTextLines + longTextArray[i] + '\n';
		}
		return longTextLines;
	} else {
		return longTextLines;
	}
}