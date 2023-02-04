export default function ResultsRecordingPage_MicNumber(context) {
	var binding = context.binding;
	var micNumber = binding.MicNumber;
	var micShortText = binding.MicShortText;
	var output = micNumber + " - " + micShortText;
	return output;
}