/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { TextTemp } from "./TextTemp";
export default function OpenTextSeq(clientAPI) {
    /* Open the Text Sequence */
    TextTemp.setAppClntDataTextSeq(clientAPI); // Update for Next Display
    clientAPI.getPageProxy().executeAction("/SmartInspections/Actions/TextTemplates/OpenTextSeq.action");
}
