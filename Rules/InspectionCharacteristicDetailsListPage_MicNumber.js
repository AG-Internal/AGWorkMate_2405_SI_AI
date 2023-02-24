/*--------------------------------------------------------------------*
* Change Tag    :  CR013
*--------------------------------------------------------------------*/
export default function InspectionCharacteristicDetailsListPage_MicNumber(context) {
	var binding = context.binding;
	//B.O.Comment for CR013
	/*if (binding.MicDescopeType !== '') {
		var micNumber = binding.MicNumber + " (DESCOPED)";
		return micNumber;
	} else {
		return binding.MicNumber;
	} */
	//B.O.Comment for CR013
	//S.O.A for CR013
	if (binding.MicDescopeType !== '') {
		var sMicShortText = binding.MicShortText + " (DESCOPED)";
		return sMicShortText;
	} else {
		return binding.MicShortText;
	}

}