/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { AutoSync } from "./AutoSync";
import { setTheme } from "../../../SAPAssetManagerExt/Rules/Themes/setTheme";

export default function SIApplicationAfterStartUp(clientAPI) {
    AutoSync.checkSyncAfterSIAppInit(clientAPI);

    //Applying the default theme after the App Initialization
    let sTheme = clientAPI.getTheme();
    setTheme.setThemeByName(clientAPI, sTheme);

}
