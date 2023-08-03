/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

import NavToResultsRecordingPage from '../NavToResultsRecordingPage.rule';
import DoMICUpdates from './DoMICUpdates';

export default function onSwipeRR_NOTE(clientAPI) {

    //get the binding
    var binding = clientAPI.getPageProxy().getExecutedContextMenuItem().getBinding();

    //Descope It
    var sReadLink = binding['@odata.readLink'];
    return DoMICUpdates(clientAPI, "NOTE", sReadLink);

}
