
export class AutoSync {

    static setAutoSyncParams() {
        //Set Minutes
        this._autoSync_Min = 4;
        this._alertBefore_Min = 2;
        //Calulate Milli Sec
        this._autoSync_MilliSec = this._autoSync_Min * 60000;
        this._alertBefore_MilliSec = this._alertBefore_Min * 60000;
        //Flags
        this.isAutoSyncOnSaveEnabled = true;
        this._autoSyncActive = false;
        this.isAutoSyncTimerSet = false;
        //set Active or Inactive Flag
        if (this._autoSync_MilliSec > 0) {
            this._autoSyncActive = true;
        }
    }

    static setSyncAlertTimeOuts(context) {
        this.setAutoSyncParams();
        if (!this._autoSyncActive) {
            return;
        }
        //Set Time
        this.lastSyncDateTime = new Date();
        this.isAutoSyncTimerSet = true;
        //init
        this.initSyncTimeout(context);
        this.initAlertTimeout();


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
        var sAlertMsg = "Information: Sync will start in " + this._alertBefore_Min + " Minutes";
        //Timeout
        this._alert_TimeOut = setTimeout(() => alert(sAlertMsg), this._alertBefore_MilliSec);
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
