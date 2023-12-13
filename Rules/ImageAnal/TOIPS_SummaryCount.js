/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { ImageAnal } from "./ImageAnal";
export default function TOIPS_SummaryCount(clientAPI) {
    var oResp = ImageAnal._oProcessedResp;
    var iProcessedCount = oResp.passCount + oResp.failCount + oResp.descopeCount;
    var sCountString = `Total Inspections: ${oResp.totalCount}  Processed: ${iProcessedCount}  Cannot be Verified: ${oResp.notVerCount}`;
    return sCountString;
}
