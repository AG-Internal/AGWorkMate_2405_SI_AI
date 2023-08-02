/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

import NavToResultsRecordingPage from '../NavToResultsRecordingPage.rule';

function ExecuteMic03UpdateEntity(pageProxy, binding) {
    pageProxy.setActionBinding(binding);
    //Must return the promised returned by executeAction to keep the chain alive.
    return pageProxy.executeAction('/SmartInspections/Actions/QualitativePFFPassAllSave_UpdateEntity.action');
}

function Wait() {
    return new Promise(r => setTimeout(r, 1));
    //return Promise.resolve();
}

export default function onSwipeRR_FAIL(clientAPI) {

    let pageProxy = clientAPI.getPageProxy();
    var binding = clientAPI.binding;
    var latestPromise = Promise.resolve();
    if (binding.MicType === '03') {

        binding.FixedValuesResult = 'FAIL';
        let bindingObject = binding;
        latestPromise = latestPromise.then(() => {
            return ExecuteMic03UpdateEntity(pageProxy, bindingObject);
        }).then(Wait);

    } else {
        return NavToResultsRecordingPage(clientAPI);
    }

}
