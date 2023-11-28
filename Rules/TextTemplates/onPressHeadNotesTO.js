/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { TextTemp } from "./TextTemp";
export default function onPressHeadNotesTO(clientAPI) {
  /* On Press NOTES Button at Techncal Object Screen */
  
  //Set the Template Area Globally
  var sTemplateArea = clientAPI.getGlobalDefinition('/SmartInspections/Globals/TextTemplates/AREA_SI_TECHOBJ.global').getValue();
  TextTemp.setTemplateArea(sTemplateArea);
  //Open the Config page
  clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/OpenConfig.action");
}
