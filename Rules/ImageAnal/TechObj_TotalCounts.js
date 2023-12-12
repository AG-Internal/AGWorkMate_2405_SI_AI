/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { ImageAnal } from "./ImageAnal";
export default function TechObj_TotalCounts(clientAPI) {
    var oTechObjInsp = ImageAnal._oTechObjectInsp;
    var sCountString = `Total Inspections: ${oTechObjInsp.totalCount} Completed: ${oTechObjInsp.completedCount} Pending: ${oTechObjInsp.pendingCount}`;
    return sCountString;
}
