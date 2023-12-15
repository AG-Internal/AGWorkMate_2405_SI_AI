/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { AttachmentUtil } from "./AttachmentUtil";
export default function GetAttachmentListQuery(clientAPI) {
    //Return the Query From Class
    return AttachmentUtil.getAttachmentListQuery();
}
