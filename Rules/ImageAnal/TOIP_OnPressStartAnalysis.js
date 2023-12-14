/**TOIP - Technical Object Inspection Page */
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { ImageAnal } from "./ImageAnal";
import Base64Library from "../../../SAPAssetManager/Rules/Common/Library/Base64Library.js";
import IsAndroid from '../../../SAPAssetManager/Rules/Common/IsAndroid.js';

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
        //alert("Please Add images");
        return clientAPI.executeAction("/SmartInspections/Actions/ImageAnal/TOIPS_AddImageToProceed.action");
        return;
    }
    var sIdActInd = clientAPI.showActivityIndicator("Fueling the AI Engine, Data Preparation in Progress..");
    /* Prepare Image Prompt */
    var aAttachArray = [];
    var base64String = "";
    var sContentType = "";
    var binarySource = "";
    //Prepare Base64 String of attachment
    for (var i = 0; i < iAttLength; i++) {
        binarySource = oAttachmentControl[0].content;
        sContentType = oAttachmentControl[0].contentType;
        base64String = Base64Library.transformBinaryToBase64(IsAndroid(clientAPI), binarySource);
        //Prepare array to use it later
        aAttachArray.push({
            "base64String": base64String,
            "contentType": sContentType,
            "image_url": `data:${sContentType};base64,${base64String}`
        });
    } //For-iAttLength

    //set attach data in global
    ImageAnal.setAttachData(aAttachArray);
    //Prepare Inspection Criteria
    ImageAnal.prepareInspCriterias();
    //Prepare the Chat Data
    ImageAnal.prepareChatData();

    clientAPI.dismissActivityIndicator(sIdActInd);

    //Call  the Chatgpt
    clientAPI.executeAction("/SmartInspections/Actions/ImageAnal/TOIP_CallChatGPTAPI.action");

}
