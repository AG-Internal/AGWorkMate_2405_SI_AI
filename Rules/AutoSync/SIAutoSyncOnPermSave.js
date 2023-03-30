/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { AutoSync } from "./AutoSync";
export default function SIAutoSyncOnPermSave(clientAPI) {
    AutoSync.doAutoSyncOnsave(clientAPI);
}
