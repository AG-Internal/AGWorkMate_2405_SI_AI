/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

function evalIsEmpty(val) {
    return (val === undefined || val == null || val.length <= 0 || val === 'undefined');
}


function navigateOnRead(context, navAction, readLink = context.getBindingObject()['@odata.readLink'], queryOption = '', aValues) {
    return context.read('/SmartInspections/Services/SAM.service', readLink, [], queryOption).then(result => {
        if (!evalIsEmpty(result)) {
            let oItem = result.getItem(0);
            // oItem.FixedValuesResult = 'PASS';
            //pouplate Required values
            for (var i = 0; i < aValues.length; i++) {
                oItem[aValues[i].key] = aValues[i].value;
            }
            if (context.setActionBinding)
                context.setActionBinding(oItem);
            else
                context.getPageProxy().setActionBinding(oItem);
            return context.executeAction(navAction).then((NavResult) => {
                return NavResult;
            });
        } else {
            return Promise.resolve(false);
        }
    });
}


export default function DoMICUpdates(clientAPI, psCallFor, psReadLink) {


    var isoDateTime = new Date().toISOString();
    var dateTime = isoDateTime.split(".");
    var time = dateTime[0].split("T");
    //Flags
    var bProceed = false;
    var aValues = [];

    //Variables to Naviagte
    var sReadLink = "";
    var sAction = "";
    var sExpand = "";

    //read Link common for all
    sReadLink = psReadLink;
    //Decide
    switch (psCallFor) {
        case "PASS":

            sAction = "/SmartInspections/Actions/QualitativePFFPassAllSave_UpdateEntity.action";
            aValues = [
                { key: "FixedValuesResult", value: "PASS" }
            ];
            bProceed = true;
            break;

        case "DESCOPE":

            sAction = "/SmartInspections/Actions/InspCharDescopeTypeSave_UpdateEntity.action";
            aValues = [
                { key: "MicDescopeType", value: "01" },
                { key: "MicDescopeDesc", value: "Inspection Tool Failure" },
                { key: "DescopedOn", value: isoDateTime },
                { key: "DescopedTime", value: time[1] },
                { key: "IsDescopeUpdated", value: true }

            ];
            bProceed = true;
            break;
        default:
            return true;
        // code block
    }

    if (bProceed) {
        return navigateOnRead(clientAPI.getPageProxy(), sAction, sReadLink, sExpand, aValues);
    }
    return false;
}



