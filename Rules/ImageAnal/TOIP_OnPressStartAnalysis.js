/**TOIP - Technical Object Inspection Page */
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { ImageAnal } from "./ImageAnal";
export default function TOIP_OnPressStartAnalysis(clientAPI) {

    /* 1. Check if it has the Attachements,
       2. get the Prompt 
       3. Prepare the Inspection Criteria 
       4. Prepare the Image Prompt*/

    //Get the attachment COntrol
    var oAttachmentControl = clientAPI.evaluateTargetPathForAPI('#Page:-Current/#Control:AttachmentControl').getValue();
    //Check attachments is added or not
    var iAttLength = oAttachmentControl.length;
    if (iAttLength <= 0) {
        alert("Please Add images");
        return;
    }

}
