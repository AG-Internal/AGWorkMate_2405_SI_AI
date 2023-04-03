/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { AutoSync } from "./AutoSync";
export default function SIApplicationAfterSync(clientAPI) {
    //AutoSync.setSyncAlertTimeOuts(clientAPI);
    AutoSync.checkSyncAfterSISyncSuccess(clientAPI);
}
