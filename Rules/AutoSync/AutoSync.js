import libVal from '../../../SAPAssetManager/Rules/Common/Library/ValidationLibrary';
export class AutoSync {

    static getParams(context) {
        /* Get the Smart Inspection parameters & in Static Variable */
        //Query
        var parameterQueryOptions =
            "$filter=ModuleName eq 'SMART_INSP_MOBILE' and Parameter1 eq 'AUTO_SYNC_SSAM' and ActiveFlag eq 'X'";
        //Read Parameters
        var oPromise = context.read('/SmartInspections/Services/SAM.service', 'ParameterDetailsSet', [], parameterQueryOptions).then(
            function (results) {
                if (results && results.length > 0) {
                    results.forEach(function (value) {
                        if (value.Parameter2 === "PERIODIC") {
                            AutoSync._autoSyncEnabled = true;
                            AutoSync._autoSync_Min = parseInt(value.Value1);
                            AutoSync._alertBefore_Min = parseInt(value.Value2);
                            AutoSync._SyncTimeExceed_Min = parseFloat(value.Value3);
                        }
                        if (value.Parameter2 === "PERMANENT_SAVE") {
                            AutoSync.isAutoSyncOnSaveEnabled = true;
                        }

                    });
                }
                return "Done";
            });

        return oPromise;
    }

    static getSAMLastSync(context) {
        /* Get the Last Sync time from SAM & in Static Variable */
        //Read SAM
        var oSAMPromise = context.read('/SAPAssetManager/Services/AssetManager.service', 'EventLog', [], '$filter=Type eq \'download\'&$top=1&$orderby=Time desc').then(function (data) {

            var syncDate = new Date(); //Set the Current date
            if (!libVal.evalIsEmpty(data)) {
                try {
                    var result = data.getItem(0);
                    syncDate = new Date(result.Time);
                } catch (e) {
                    syncDate = new Date();
                }
            }
            //set it Static Variable
            AutoSync._LastsyncDateTime = syncDate;
            return syncDate;
        });

        return oSAMPromise;
    }
    static initAutoSyncParams(paFrom) {
        // Init Params
        if (!this.paramsInitialized) {
            this.paramsInitialized = true;
            //PERIODIC
            this._autoSyncEnabled = false; /* Auto Sync Feature Enabled */
            this._autoSync_Min = 0; /* Auto Sync Minutes */
            this._alertBefore_Min = 0;/* Auto Sync Alert Before Minutes */
            this._SyncTimeExceed_Min = 0;/* Sync Time When Exceed the Auto SYnc minutes */

            //PERMANENT_SAVE
            this.isAutoSyncOnSaveEnabled = false;  /* Auto Sync on SAVE Feature Enabled */

            //Retrived or Set Locally
            this._LastsyncDateTime = null; /* Last Sync Time */
            this._autoSyncActive = false; /* Auto Sync Feature can be made active with Parameters */
            this.isAutoSyncTimerSet = false; /* Timers set  */
        }
        // Do Calculation
        this.setAutoSyncParams(paFrom);
    }

    static convertMSToMinutes(paValue) {
        var minutes = Math.floor(paValue / 60000);
        return minutes;
    }
    static convertMinutesToMS(paValue) {
        var millsec = paValue * 60000;
        return millsec;
    }
    static convertMinutesToSec(paValue) {
        var sec = Math.floor(paValue * 60);
        return sec;
    }
    static calcMilliSecs() {
        this._autoSync_MilliSec = this._autoSync_Min * 60000;
        this._alertMin = this._autoSync_Min - this._alertBefore_Min;
        this._alert_MilliSec = this._alertMin * 60000;
    }

    static setAutoSyncParams(paFrom) {

        //Calulate Milli Sec
        this.calcMilliSecs();
        //Flags
        this._autoSyncActive = false;
        this.isAutoSyncTimerSet = false;
        //set Active or Inactive Flag
        if (this._autoSyncEnabled) {
            this._autoSyncActive = true;
        } else {
            return;
        }

        var scenario = "";
        var currentTime = new Date();
        //Next Sync Time
        var nextSyncTime = new Date(this._LastsyncDateTime.getTime());
        nextSyncTime.setMilliseconds(nextSyncTime.getMilliseconds() + this._autoSync_MilliSec);


        if (currentTime >= nextSyncTime) {
            /* Do the Sync Immediately */
            this._autoSync_Min = this._SyncTimeExceed_Min;
            this._alertBefore_Min = this._SyncTimeExceed_Min;
            scenario = "Current Time Greater than To be Auto Synced Time";

        } else {
            //set Auto sync time based on remainig  time
            var diffInMs = nextSyncTime - currentTime;
            var diffInMinutes = this.convertMSToMinutes(diffInMs);
            this._autoSync_Min = diffInMinutes;

            if (this._autoSync_Min > this._alertBefore_Min) {
                //leave it as its
                scenario = "Alert With in Range";
            } else {
                //Else 
                this._alertBefore_Min = this._autoSync_Min;
                scenario = "Show Alert Immediately";
            }
        }
        this.calcMilliSecs();

        if (paFrom === "PROMISE") {
            alert("  -> Last Sync Time: " + this._LastsyncDateTime + "  -> Current Time: " + currentTime + " -> Next Sync Time" + nextSyncTime +
                "Next Alert Before :" + this._alertBefore_Min + " -->Scenario: " + scenario);

        }
    }


    static setSyncAlertTimeOuts(context) {

        // Init Params
        this.initAutoSyncParams("INIT");

        //Call Promises to get Params
        var oPromise = this.getParams(context);/* SI Params */
        var oSAMPromise = this.getSAMLastSync(context);/* SAM Params */

        //After Promise Do the Timer Set
        Promise.all([oPromise, oSAMPromise]).then(function (param) {

            //Set Parameter after set variables
            AutoSync.setAutoSyncParams("PROMISE");

            if (!AutoSync._autoSyncActive) {
                return;
            }
            //Set Time set Flag
            AutoSync.isAutoSyncTimerSet = true;
            //init
            AutoSync.initSyncTimeout(context);
            AutoSync.initAlertTimeout();
        });

    }

    static initSyncTimeout(context) {
        /*Init Auto Sync Timer*/
        this._autoSync_TimeOut = setTimeout(function () {
            return context.executeAction('/SmartInspections/Actions/StartingAutoSync.action');
        },
            this._autoSync_MilliSec);
        //show message
        return context.executeAction('/SmartInspections/Actions/SIAutoSyncSet.action');
    }

    static initAlertTimeout() {
        /* Init Alert Message Timer */
        var sAlertMsg = "Information: Sync will start in " + this._alertBefore_Min + " Minute(s)";
        if (this._alertBefore_Min < 1) {
            sAlertMsg = "Information: Sync will start in " + this.convertMinutesToSec(this._alertBefore_Min) + " Second(s)";
        }
        else if (this._alertBefore_Min = 0) {
            sAlertMsg = "Information: Auto Sync will start now";
        }

        //Timeout
        this._alert_TimeOut = setTimeout(() => alert(sAlertMsg), this._alert_MilliSec);
    }

    static clearTimeOuts() {
        /* Clear Timeouts */
        //Auto sync
        if (this._autoSync_TimeOut) {
            clearTimeout(this._autoSync_TimeOut);
        }
        //Alert
        if (this._alert_TimeOut) {
            clearTimeout(this._alert_TimeOut);
        }
    }
    static checkSyncAfterSIAppInit(context) {
        /* Check whether to Sync after Init */
        if (this.isAutoSyncTimerSet) {
            /* if timer is Already set , then Trigger the Auto sync when its intialized again 
            beacuse when App is Closed and Opend Time out will be deleted*/
            this.clearTimeOuts();
            return context.executeAction('/SmartInspections/Actions/StartingAutoSync.action');
        } else {
            /* Set the Timer if not set */
            this.clearTimeOuts();
            this.setSyncAlertTimeOuts(context);
        }
    }

    static doAutoSyncOnsave(context) {
        /* So Auto Sync on Perm save*/
        if (!this.isAutoSyncOnSaveEnabled) {
            return true;
        }
        this.clearTimeOuts();
        return context.executeAction('/SmartInspections/Actions/StartingAutoSync.action');
    }

}
