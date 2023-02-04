export default function InspectionCharacteristicDetailsListPage_MicType(context) {
	var binding = context.binding;
	var micType = binding.MicType;
	var footnote = '';
	if (micType === '01') {
		footnote = '01 - Quantitative';
	} else if (micType === '02') {
		footnote = '02 - Qualitative';
	} else if (micType === '03') {
		footnote = '03 - P/F/F';
	} else if (micType === '04') {
		footnote = '04 - Quantitative Multiple';
	} else if (micType === '05') {
		footnote = '05 - Date';
	}
	return footnote;
}