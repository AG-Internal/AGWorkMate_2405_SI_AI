function getActionResultError(context, key) {
	var targetPath = '#ActionResults:' + key + '/#Property:error';
	var errorString = context.evaluateTargetPath(targetPath);
	// //Remove error code and 'Error Description' from the message string
	// var error = errorString.message.replace(/\[(.*)\]\s*/g, '').replace(/Error description:\s*/g, '');
	return errorString.message;
}

export default function ODataFailure(context) {
	var error = '';
	try {
		error += '\n' + getActionResultError(context, 'result');
	} catch (actionResultError) {
		// do nothing
	}
	//return context.localizeText('serviceUnavailable') + error;
	return error;
}