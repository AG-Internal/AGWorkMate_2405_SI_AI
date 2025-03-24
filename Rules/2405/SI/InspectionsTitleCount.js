/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import CardTitles from "./CardTitles";
export default function InspectionsTitleCount(clientAPI) {
    return CardTitles(clientAPI, "OVP_INSPCOUNT");
}
