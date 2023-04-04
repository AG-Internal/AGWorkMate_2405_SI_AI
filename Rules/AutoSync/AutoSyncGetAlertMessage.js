/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { AutoSync } from "./AutoSync";
export default function AutoSyncGetAlertMessage(clientAPI) {
    return AutoSync._alertMsg;
}
