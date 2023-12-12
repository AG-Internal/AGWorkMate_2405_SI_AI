export class GetDataUtil {
    /**********************************************************
       * Get FAILED MICS of Technical Object
       **********************************************************/
    static getTechObjFailedInspForAI(clientAPI, oDetails) {
        // var oDetails = { OrderNumber : "", TechnicalObject : "" , TechnicalObjectDesc:""};
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

    /**********************************************************
     * Get Technical Object Inspections
    **********************************************************/

    static getTechObjInspForAI(clientAPI, oTechObjectBinding) {
        var binding = oTechObjectBinding;
        //Varaibles
        var orderNumber = binding.OrderNumber;
        var technicalObject = binding.TechnicalObject;
        var descopeType = binding.DescopeType;
        var status = binding.Status;
        var inspectionType = binding.InspectionType;
        //PageData
        // let pageProxy = clientAPI.getPageProxy();
        // let pageClientData = pageProxy.getClientData();
        //Query
        var sInspCharQueryOptions = "";
        var sOrderby = "";
        //Query
        sInspCharQueryOptions = `$filter=OrderNumber eq '${orderNumber}' and TechnicalObject eq '${technicalObject}' 
		and DeleteFromWoSnap eq false and substringof('${inspectionType}', InspectionTypes) eq true`;
        //Order By
        sOrderby = "&$orderby=SortNumber, ListCounter, OperationNumber, InspectionCharacteristicNumb";
        //Final Query
        sInspCharQueryOptions = sInspCharQueryOptions + sOrderby;

        /*Response*/
        var oResponse = {
            //Mics
            aAllMics: [],
            a02Mics: [],
            //Count
            totalCount: 0,
            completedCount: 0,
            pendingCount: 0,
            passCount: 0,
            fixCount: 0,
            failCount: 0,
            descopeCount: 0,
            //Query
            sResultDataSetQuery: undefined
        };
        //Read the Entity
        var oInspCharPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'InspectionCharacteristicDetailsSet', [],
            sInspCharQueryOptions).then(
                function (results) {
                    /* Prepare Data for Response */
                    var aAllMics = [];//All Mics
                    var a02Mics = [];//02 Types Mics
                    var aRDQuery = [];//Result Data Query array
                    var totalCount = 0, completedCount = 0, pendingCount = 0,
                        passCount = 0, failCount = 0, fixCount = 0, descopeCount = 0;//Counts
                    var sResultDataSetQuery = undefined;
                    //Prepare data
                    if (results && results.length > 0) {
                        results.forEach(function (value) {
                            //append all Mics
                            aAllMics.push(value);
                        })//ForEach;
                    }
                    //Query to get Result Set Data
                    for (var i = 0; i < aAllMics.length; i++) {
                        if (aAllMics[i].MicType === '02') {
                            a02Mics.push(aAllMics[i].MicNumber);
                            //Prepare for each line & Push it in an array
                            sResultDataSetQuery = `(MicNumber eq '${aAllMics[i].MicNumber}' and Version eq '${aAllMics[i].Version}' and MicPlant eq '${aAllMics[i].MicPlant}')`;
                            aRDQuery.push(sResultDataSetQuery);
                        }//if MicType=02

                        // Counts
                        totalCount += 1;
                        if (aAllMics[i].FixedValuesResult === 'PASS') {
                            passCount += 1;
                            completedCount += 1;
                        } else if (aAllMics[i].FixedValuesResult === 'FIX') {
                            fixCount += 1;
                            completedCount += 1;
                        } else if (aAllMics[i].FixedValuesResult === 'FAIL') {
                            failCount += 1;
                            completedCount += 1;
                        } else if (aAllMics[i].MicDescopeType !== '') {
                            descopeCount += 1;
                            completedCount += 1;
                        } else {
                            pendingCount += 1;
                        }

                    }//For aAllMics

                    /*Prepare Query */
                    if (aRDQuery.length > 0) {
                        //Join all the conditions with or
                        var sRDQueryCon = aRDQuery.join(" or ");
                        //get only accepted /Pass Code
                        sResultDataSetQuery = `$filter=CodeValuation eq 'A' and (${sRDQueryCon})`;
                    } else {
                        //Dummy Condition
                        sResultDataSetQuery = "$filter=CodeValuation eq 'X'";
                    }
                    /*Update Response*/
                    oResponse.aAllMics = aAllMics;
                    oResponse.a02Mics = a02Mics;
                    //count
                    oResponse.totalCount = totalCount;
                    oResponse.completedCount = completedCount;
                    oResponse.pendingCount = pendingCount;
                    oResponse.passCount = passCount;
                    oResponse.fixCount = fixCount;
                    oResponse.failCount = failCount;
                    oResponse.descopeCount = descopeCount;
                    //Query
                    oResponse.sResultDataSetQuery = sResultDataSetQuery;
                    return oResponse;
                });

        return oInspCharPromise;

    }//getTechObjInspForAI

    /**********************************************************
       * Get Result Data Set Based on Query
      **********************************************************/
    static getResultDataSetOnQuery(clientAPI, psQuery) {
        /* Get the Results Data based on Query */
        var sResultDataSetQuery = "";//Query String
        var oResponse = {
            aMicNo: [],  //Mic Number
            aResults: [] //Result Objects
        };
        //pass Query from arguments
        sResultDataSetQuery = psQuery;
        /* read the Entity */
        var oResultDataPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'ResultsDataSet', [],
            sResultDataSetQuery).then(function (results) {
                var aResults = [];
                var aMicNo = [];
                //Process results
                if (results && results.length > 0) {
                    results.forEach(function (value) {
                        aResults.push(value); //Full row
                        aMicNo.push(value.MicNumber) //mic no
                    })//ForEach

                }//if results
                //pass to repsonse
                oResponse.aMicNo = aMicNo;
                oResponse.aResults = aResults;
                //return the resposne 
                return oResponse;
            });

        return oResultDataPromise;
    }//getResultDataSetOnQuery

    /**********************************************************
       * Get Template Details based on Template Area
      **********************************************************/
    static getTemplateDetailForArea(clientAPI, psTemplateArea) {
        /* get Template Config and then get the Area */

        //Config Query
       
        var sTemplateConfigQuery = `$filter=TemplateArea eq '${psTemplateArea}'`;
        //Read Parameters
        var oPromise = clientAPI.read('/SmartInspections/Services/SAM.service', 'LTTemplateConfigSet', [], sTemplateConfigQuery).then(
            function (results) {
                /* Variables*/
                var aConfigs = [];
                var aTemplateTexts = [];
                /*get the Template ID */
                var sTemplateID = "";
                if (results && results.length > 0) {
                    results.forEach(function (value) {
                        aConfigs.push(value);
                    })//ForEach
                }//Results
                if (aConfigs.length > 0) {
                    //Read the First Template & continue to proceed
                    sTemplateID = aConfigs[0].TemplateID;
                } else {
                    //no Template ID found then return empty array
                
                    return aTemplateTexts;
                }
             
                /**Call Next Promise to get Template Details */
                var sTemplateTextQuery = `$filter=TemplateID eq '${sTemplateID}'&$orderby=TempCounter`;
                //Read
                return clientAPI.read('/SmartInspections/Services/SAM.service', 'LTTemplateTextSet', [], sTemplateTextQuery).then(
                    function (ttresults) {
                   
                        if (ttresults && ttresults.length > 0) {
                            ttresults.forEach(function (value) {
                                aTemplateTexts.push(value);
                            })//ForEach
                        }
                        return aTemplateTexts;
                    });//LTTemplateTextSet

            });//LTTemplateConfigSet

        return oPromise

    }//getTemplateDetailForArea



}//CLASS-GetDataUtil