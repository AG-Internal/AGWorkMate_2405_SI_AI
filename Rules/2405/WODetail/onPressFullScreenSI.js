/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

import SIDetailAction from "./SIDetailAction";

export default function onPressFullScreenSI(clientAPI) {
    return SIDetailAction(clientAPI, "FULL_DETAILS");
}
