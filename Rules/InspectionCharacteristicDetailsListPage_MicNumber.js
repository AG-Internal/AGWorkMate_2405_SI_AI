export default function InspectionCharacteristicDetailsListPage_MicNumber(context) {
	var binding = context.binding;
	if (binding.MicDescopeType !== '') {
		var micNumber = binding.MicNumber + " (DESCOPED)";
		return micNumber;
	} else {
		return binding.MicNumber;
	}
}