/**Change Tag : SIV2203, Date:1-Nov-22, Description: EX Group, 
New Rule : On Selecting EX group handle changes
 */
export default function EXGroupList_OnPress(clientAPI) {
	let listPageClientData = "''";
	/* Get the Page Proxy*/
	let pageProxy = clientAPI.getPageProxy();
	let pageClientData = pageProxy.getClientData();
	/* get Selected Data & Set it in Page proxy*/
	var oActionBinding = clientAPI.getPageProxy().getActionBinding();
	/* Put it in page client*/
	pageClientData.SelectedEXLine = oActionBinding;
	pageClientData.EXGrp = oActionBinding.EXGrp;
	pageClientData.EXGrpDesc = oActionBinding.EXGrpDesc;
	/* read the Tech object Page client*/
	try {
		listPageClientData = clientAPI.evaluateTargetPath("#Page:TechnicalObjectDetailsList/#ClientData");
		var binding = listPageClientData.NavigatedTechObject;
	} catch (err) {}

	//check if there is change
	if (binding.ExGrp === oActionBinding.EXGrp) {
		//No Change
		return clientAPI.executeAction('/SmartInspections/Actions/EXGroupList_Close.action');
	} else {
		return clientAPI.executeAction('/SmartInspections/Actions/EXGroup_ConfMsg.action');
	}

}