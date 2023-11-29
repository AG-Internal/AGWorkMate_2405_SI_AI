/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { TextTemp } from "./TextTemp";
export default function TextSeqSubmitButtonEnabled(clientAPI) {
    var bEnabled = false;
    if (TextTemp.PageTextSeq.IsLastItem) {
        bEnabled = true;
    }
    return bEnabled;
}

