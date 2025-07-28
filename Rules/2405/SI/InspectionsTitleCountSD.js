/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import CardTitles from "./CardTitles";
export default function InspectionsTitleCountSD(clientAPI) {
    return CardTitles(clientAPI, "OVP_INSPCOUNT_SD");
}
