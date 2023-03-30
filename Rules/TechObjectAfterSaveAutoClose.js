/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
import { AutoSync } from "./AutoSync/AutoSync";
import ResultType from "./SIentryWO";
function ExecuteUpdateEntity(pageProxy, binding) {
    pageProxy.setActionBinding(binding);
    //Must return the promised returned by executeAction to keep the chain alive.
    return pageProxy.executeAction('/SmartInspections/Actions/WorkOrderSave_UpdateEntity.action');
}

function Wait() {
    return new Promise(r => setTimeout(r, 200))
}
export default function TechObjectAfterSaveAutoClose(clientAPI) {

    let pageProxy = clientAPI.getPageProxy();
    let pageClientData = pageProxy.getClientData();
    var orderNumber = clientAPI.getPageProxy().getBindingObject().OrderId;


    var techObjQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "'";
    var techObjPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'TechnicalObjectDetailsSet', [], techObjQueryOptions).then(
        function (results) {
            var TotalCount = results.length;
            var RecCount = 0;
            var pSaveCount = 0;
            var descopeCount = 0;
            var notRecCount = 0;
            var bCanClose = false;
            if (results && results.length > 0) {
                results.forEach(function (value) {
                    if (value.Status === 'P') {
                        pSaveCount = pSaveCount + 1;
                    } else if (value.DescopeType !== '') {
                        descopeCount = descopeCount + 1;
                    } else {
                        notRecCount = notRecCount + 1;
                    }
                });
            }
            RecCount = pSaveCount + descopeCount;

            if (TotalCount === RecCount && TotalCount > 0) {
                bCanClose = true;
            }
            return bCanClose;


        });

    var workOrderQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "'";
    var woPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'WorkOrderHeaderSet', [], workOrderQueryOptions).then(
        function (results) {
            var binding = {};
            if (results && results.length > 0) {
                results.forEach(function (value) {
                    binding = value;
                });
            }
            return binding;
        });


    return Promise.all([woPromise, techObjPromise]).then(function (object) {
        var latestPromise = Promise.resolve();
        var binding = object[0];
        var bCanClose = object[1];
        var bClosedAlready = false;
        if (binding.CloseOrder === 'X') {
            bClosedAlready = true;
            //return true;
            //return pageProxy.executeAction('/SmartInspections/Actions/WorkOrderAlreadyClosed_ErrorMessage.action');
        } else if (bCanClose) {
            latestPromise = latestPromise.then(() => {
                binding.CloseOrder = 'X';
                return ExecuteUpdateEntity(pageProxy, binding);
            }).then(Wait);

            return latestPromise.then(function () {
                return pageProxy.executeAction('/SmartInspections/Actions/WorkOrderAutoCloseSuccess.action');
            }.bind(pageProxy));
        } else {
            bClosedAlready = true;
            //return true;
            //  alert("Sorry Not Qualified to  Close now");
        }
        if (bClosedAlready) {
            /* Do Auto Sync if need */
            return AutoSync.doAutoSyncOnsave(clientAPI);
        }
    });

}
