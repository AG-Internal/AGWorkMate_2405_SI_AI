export class GetDataUtil {
    /**********************************************************
       * Get FAILED MICS of Technical Object
       **********************************************************/
    static getTechObjFailedInspForAI(clientAPI, oDetails) {
        // var oDetails = { OrderNumber : "", TechnicalObject : "" };
        /** Get Technical Object Failed Inspection */
        var oResponse = { bHasFails: false, aMics: [], sFaultText: "" };
        var orderNumber = oDetails.OrderNumber;
        var technicalObject = oDetails.TechnicalObject;

        var inspCharQueryOptions = "$filter=OrderNumber eq '" + orderNumber + "' and TechnicalObject eq '" + technicalObject +
            "' and FixedValuesResult eq 'FAIL'";

        //Read the Entity to get Fail
        var oPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet', [], inspCharQueryOptions).then(
            function (results) {

                var sShortText = "";
                var sFaultText = "";
                var bHasFails = false;
                var aMics = [];

                if (results && results.length > 0) {
                    results.forEach(function (value) {
                        //Push to array
                        aMics.push(value);
                    });
                }//if-results

                //Has Fail Flag
                if (aMics.length > 0) {
                    bHasFails = true
                }
                //ShortText Prep
                for (var i = 0; i < aMics.length; i++) {
                    sShortText = aMics[i].MicShortText + " (FAIL), ";
                    //Keep appending
                    sFaultText = sFaultText + sShortText;
                }
                //Pass to Response and Return
                oResponse.bHasFails = bHasFails;
                oResponse.aMics = aMics;
                oResponse.sFaultText = sFaultText;
                //Return the Response
                return oResponse;
            });

        return oPromise;

    }//getTechObjFailedInspForAI

}//GetDataUtil