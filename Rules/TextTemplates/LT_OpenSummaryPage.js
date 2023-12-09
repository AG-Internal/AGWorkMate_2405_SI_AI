/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { TextTemp } from "./TextTemp";
export default function LT_OpenSummaryPage(clientAPI) {
    /* Open Summary Page Directly for Long Text */

    //Summarize the Long Text .ie Pass the Long Text from Template 
    TextTemp.LTSummarizeLongText();
    //Open the Summary Page
    clientAPI.executeAction("/SmartInspections/Actions/TextTemplates/OpenTextSeqSummary.action");

}
