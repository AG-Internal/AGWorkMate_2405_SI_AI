import libVal from './Common/ValidationLibrary';

export default function SmartInspectionsErrorArchive_Message(context) {
	var binding = context.binding;
	return context.read('/SmartInspections/Services/SAM.service', 'ErrorArchive', [], '$filter=RequestID eq ' + binding.RequestID).then(
		function (data) {

			let pageProxy = context.getPageProxy();
			let pageClientData = pageProxy.getClientData();
			if (pageClientData.ItemCount == undefined || pageClientData.ItemCount == '') {
				pageClientData.ItemCount = 1;
			} else {
				pageClientData.ItemCount = pageClientData.ItemCount + 1;
			}

			if (!libVal.evalIsEmpty(data)) {
				try {
					//let message = JSON.parse(data.getItem(0).Message);// -- INC00074226-RT-ERROR
					var message = JSON.parse(JSON.stringify(data.getItem(0).Message).replace(/\\/g,'').slice(1, -1));//++  INC00074226-RT-ERROR
					return pageClientData.ItemCount + ". " + message.error.message.value;
				} catch (e) {
					if (!libVal.evalIsEmpty(data.getItem(0).Message)) {
						//return pageClientData.ItemCount + ". " + data.getItem(0).Message.error;// -- INC00074226-RT-ERROR
						return pageClientData.ItemCount + ". " + data.getItem(0).Message;// ++ INC00074226-RT-ERROR
					} else {
						return '-';
					}
				}
			}
			return '-';
		});
}