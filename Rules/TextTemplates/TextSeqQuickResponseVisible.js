/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { TextTemp } from "./TextTemp";
export default function TextSeqQuickResponseVisible(clientAPI) {
    var bVisible = false;
    var sLongText = TextTemp.PageTextSeq.Item.TempLongText || "";
    if (sLongText.search(/Y\/N/i) >= 0)
        bVisible = true;

    return bVisible;
}
