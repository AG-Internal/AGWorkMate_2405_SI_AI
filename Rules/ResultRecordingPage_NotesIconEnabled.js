/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ResultRecordingPage_NotesIconEnabled(clientAPI) {
    var bVisible = false;

    var binding = clientAPI.getPageProxy().getBindingObject();
    var longText = binding.LongText;
    var longTextLines = '';
    var longTextArray = longText.split("new_line");

    if (longTextArray.length > 0) {
        for (var i = 0; i < longTextArray.length; i++) {
            longTextLines = longTextLines + longTextArray[i];
        }
    }
    if (longTextLines != '') {
        bVisible = true;
    }
    return bVisible;
}
