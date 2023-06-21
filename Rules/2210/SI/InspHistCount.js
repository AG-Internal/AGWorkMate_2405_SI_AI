/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import CardTitles from "./CardTitles";

export default function InspHistCount(clientAPI) {
    return CardTitles(clientAPI, "INSP_HISTORY");
}
