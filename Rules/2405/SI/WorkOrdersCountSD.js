/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import CardTitles from "./CardTitles";
export default function WorkOrdersCountSD(clientAPI) {
    return CardTitles(clientAPI, "OVP_WOCOUNT_SD");

}
