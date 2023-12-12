/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { ImageAnal } from "./ImageAnal";
export default function TechObj_InspCounts(clientAPI) {
    var oTechObjInsp = ImageAnal._oTechObjectInsp;
    var sCountString = `Pass: ${oTechObjInsp.passCount} Fix: ${oTechObjInsp.fixCount} Fail: ${oTechObjInsp.failCount} Descope: ${oTechObjInsp.descopeCount}`;
    return sCountString;
}
