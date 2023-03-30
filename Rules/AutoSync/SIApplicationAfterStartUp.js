/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { AutoSync } from "./AutoSync";
export default function SIApplicationAfterStartUp(clientAPI) {
    AutoSync.checkSyncAfterSIAppInit(clientAPI);
}
