export default function NavToSmartInspectionsErrorArchiveAffectedEntity(context) {
	let errorArchiveEntity = context.binding;
	let pageProxy = context.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	pageClientData.LastPressed = 'ErrorFix';
	let targetAction = null;
	let id = errorArchiveEntity["@odata.id"];
	let affectedEntityType = "Unknown Entity Set"; //By default it's unknown type
	if (id.indexOf("(") > 0) {
		//Extracting the entity set type from @odata.id 
		var patt = /\/?(.+)\(/i;
		var result = id.match(patt);
		affectedEntityType = result[1];
	}

	console.log("Affected Entity Type Is:");
	console.log(affectedEntityType);
	//Here we decide which action to call depends on which affectedEntityType is the affectedEntity
	// You can add more complex decision logic if needed
	switch (affectedEntityType) {

	case "InspectionCharacteristicDetailsSet":

		var micType = errorArchiveEntity.MicType;
		if (micType === '01') {
			targetAction = '/SmartInspections/Actions/QuantitativeFixSave_UpdateEntity.action';
		} else if (micType === '02') {
			targetAction = '/SmartInspections/Actions/QualitativeYNFixSave_UpdateEntity.action';
		} else if (micType === '03') {
			targetAction = '/SmartInspections/Actions/QualitativePFFFixSave_UpdateEntity.action';
		} else if (micType === '04') {
			targetAction = '/SmartInspections/Actions/QuantitativeMultipleFixSave_UpdateEntity.action';
		} else if (micType === '05') {
			targetAction = '/SmartInspections/Actions/QualitativeDateFixSave_UpdateEntity.action';
		}
		break;

	case "TechnicalObjectDetailsSet":

		targetAction = '/SmartInspections/Actions/TechnicalObjectFixSave_UpdateEntity.action';
		break;

	default:

		//Save the affected Entity's type in client data so that it can be displayed by the toast
		context.getPageProxy().getClientData().AffectedEntityType = affectedEntityType;
		// Show a toast for affectedEntityType that we do not handle yet
		return context.executeAction("/SmartInspections/Actions/ErrorArchiveDetailsCannotFix_Message.action");

	}

	if (targetAction != '') {
		let pageProxy = context.getPageProxy();
		//Set the affectedEntity object to root the binding context.
		pageProxy.setActionBinding(errorArchiveEntity);
		//Note: doing 'return' here is important to chain the current context to the action.
		// Without the return the ActionBinding will not be passed to the action because it will consider
		// you are executing this action independent of the current context.
		return context.executeAction(targetAction);
	}
}