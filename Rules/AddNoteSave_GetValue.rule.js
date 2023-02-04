export default function AddNote_GetValue(clientAPI) {
	var quantitativeLongTextControl = clientAPI.getControl('FormCellContainer').getControl('LongText');
	var quantitativeLongText = quantitativeLongTextControl.getValue();
	quantitativeLongText = quantitativeLongText.split('\n').join('new_line');
	return quantitativeLongText;
}