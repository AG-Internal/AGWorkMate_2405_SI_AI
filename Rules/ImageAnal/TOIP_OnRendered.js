/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { ImageAnal } from "./ImageAnal";
export default function TOIP_OnRendered(clientAPI) {

    if (!ImageAnal._sPromptSystem) {
        /* Read the Prompt and save it n Global for Processing */
        return ImageAnal.getPromptFromTemplateData(clientAPI).then(function (bHasData) {
            if (!bHasData) {
                alert("Prompt not found")
            }
            return true;
        }).catch((error) => {
            alert('Sorry an Error Occured while reading prompt');
        });
    }
}
