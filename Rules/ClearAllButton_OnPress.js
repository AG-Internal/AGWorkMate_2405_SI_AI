/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function Wait() {
    //Resolves after 1 s
    return new Promise(r => setTimeout(r, 1));
    //return Promise.resolve();
}

function ExecuteInspClearAllEntity(clientAPI, binding) {
    /* Call Method to update it */
    clientAPI.getPageProxy().setActionBinding(binding);
    return clientAPI.executeAction('/SmartInspections/Actions/InspectionClearAll_UpdateEntity.action');
}
export default function ClearAllButton_OnPress(clientAPI) {
    /* Variables */
    var binding = clientAPI.getPageProxy().binding;
    var orderNumber = binding.OrderNumber;
    var technicalObject = binding.TechnicalObject;
    let pageProxy = clientAPI.getPageProxy();
    let pageClientData = pageProxy.getClientData();
    var nActivityInd = clientAPI.showActivityIndicator("CLEAR ALL in progress. Please wait...");
    //Query
    var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and TechnicalObject eq '" + technicalObject + "'";
    //Order By
    var sOrderby = "&$orderby=SortNumber, ListCounter, OperationNumber, InspectionCharacteristicNumb";
    //Final Query
    inspCharQueryOptions = inspCharQueryOptions + sOrderby;

    //Read the MICs under TO and find if any MIC has Result
    var inspCharPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet', [],
        inspCharQueryOptions).then(
            function (results) {
                /* FInd MIC if it has Result or Descoped */
                var micAllObjects = [];
                if (results && results.length > 0) {
                    results.forEach(function (value) {
                        if (value.FixedValuesResult !== '' || value.MicDescopeType !== '' || value.Result !== '') {
                            micAllObjects.push(value);
                        }
                    });
                }//Results
                pageClientData.micAllObjects = micAllObjects;
                return micAllObjects;
            });//then

    Promise.all([inspCharPromise]).then(function (pResults) {
        var latestPromise = Promise.resolve();
        var aMics = pageClientData.micAllObjects;

        if (aMics.length > 0) {
            //Loop the Mics and Update
            for (var i = 0; i < aMics.length; i++) {

                let oMicBinding = aMics[i];
                if (oMicBinding.MicDescopeType !== "") {
                    oMicBinding.MicDescopeType = "";
                    oMicBinding.IsDescopeUpdated = true;
                } else {
                    oMicBinding.Result = "";
                    oMicBinding.FixedValuesResult = "";
                    oMicBinding.DefectCode = "";
                    oMicBinding.DefectCodeGroup = "";
                }
                //Long Text
                oMicBinding.LongText = "";

                //Call Update
                latestPromise = latestPromise.then(() => {
                    return ExecuteInspClearAllEntity(clientAPI, oMicBinding);
                }).then(Wait);
            }

            return latestPromise.then(function () {
                clientAPI.dismissActivityIndicator(nActivityInd);
                return clientAPI.executeAction('/SmartInspections/Actions/ClearAllCompleted.action');
            });
        } else {
            //Nothing to Clear 
            return latestPromise.then(function () {
                clientAPI.dismissActivityIndicator(nActivityInd);
                return clientAPI.executeAction('/SmartInspections/Actions/ClearAllNoDataToSave_Message.action');
            });
        }
    });
}
