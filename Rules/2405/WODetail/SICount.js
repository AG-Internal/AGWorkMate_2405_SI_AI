/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

import CardTitles from "./CardTitles";

export default function SICount(clientAPI) {
    return CardTitles(clientAPI, "SMART_INSPECTIONS");
}
