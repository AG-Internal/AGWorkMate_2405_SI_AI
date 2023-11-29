/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { TextTemp } from "./TextTemp";
export default function TextSeqNextButtonEnabled(clientAPI) {
    var bEnabled = true;
    if (TextTemp.PageTextSeq.IsLastItem) {
        bEnabled = false;
    }
    return bEnabled;
}
