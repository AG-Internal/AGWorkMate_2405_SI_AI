/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { TextTemp } from "./TextTemp";
export default function ChatGPTInputPage_Content(clientAPI) {
    /* Get Content to beDispalyed in ChatGPT Input Page */

    return TextTemp._aiPageData.Item.Content;
}
