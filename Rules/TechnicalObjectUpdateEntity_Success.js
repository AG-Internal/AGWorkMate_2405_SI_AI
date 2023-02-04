export default function TechnicalObjectUpdateEntity_Success(clientAPI) {

  let clientData = clientAPI.evaluateTargetPath("#Page:TechnicalObjectPermSaveList/#ClientData");
  let updateMode = clientData.UpdateMode;
  
  	if (updateMode !== 'Selection') {
		return clientAPI.executeAction("/SmartInspections/Actions/Save_SuccessMessage.action");
	}
	
}
