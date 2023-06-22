/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import CardTitles from "./CardTitles";
export default function WorkOrdersCount(clientAPI) {
    return CardTitles(clientAPI, "OVP_WOCOUNT");

}
