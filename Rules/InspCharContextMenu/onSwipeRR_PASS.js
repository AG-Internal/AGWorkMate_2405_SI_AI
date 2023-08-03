/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

import NavToResultsRecordingPage from '../NavToResultsRecordingPage.rule';
import DoMICUpdates from './DoMICUpdates';

export default function onSwipeRR_PASS(clientAPI) {
    //get the binding
    var binding = clientAPI.getPageProxy().getExecutedContextMenuItem().getBinding();

    //based on MIC Type
    if (binding.MicType === '03') {

        var sReadLink = binding['@odata.readLink'];
        return DoMICUpdates(clientAPI, "PASS", sReadLink);

    } else {
        //Open RR Page
        return NavToResultsRecordingPage(clientAPI);
    }

}
