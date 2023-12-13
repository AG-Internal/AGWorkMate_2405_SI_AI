/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { ImageAnal } from "./ImageAnal";
export default function TOIPS_TableData(clientAPI) {
    var aTableData = ImageAnal._oProcessedResp.aResponse;
    return aTableData;
}
