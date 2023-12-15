/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { AttachmentUtil } from "../SIAttachments/AttachmentUtil";

export default function TechObj_OnPressAttach(clientAPI) {
    //Get binding
    var oTechObjectBinding = clientAPI.getPageProxy().binding;//Tech object Binding
    //Set Keys
    AttachmentUtil.setKeysFromTechObjectBinding(oTechObjectBinding);
    //Open attachment List
    clientAPI.executeAction("/SmartInspections/Actions/SIAttachments/TechObj_OpenAttachmentList.action");
}
