/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

import SIDetailAction from "./SIDetailAction";

export default function onPressSI(clientAPI) {
    SIDetailAction(clientAPI, "SMART_INSPECTION");
}
