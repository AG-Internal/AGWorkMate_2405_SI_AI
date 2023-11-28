import libVal from '../../../SAPAssetManager/Rules/Common/Library/ValidationLibrary';
export class TextTemp {

    /* Get and Set Template Area */
    static setTemplateArea(psTemplateArea) {
        this._sTemplateArea = psTemplateArea;
    }

    static getTemplateArea() {
        return this._sTemplateArea;
    }

    /* Check Connections */
    static hasConnection(context) {
        //check if we have any netwrok connection
        var bHasConnection = false;
        if (context.getPageProxy().nativescript.connectivityModule.getConnectionType()) {
            bHasConnection = true;
        }
        return bHasConnection;
    }
    /* Get Templates */
    static readConfigs(context, psTemplateArea) {
        /* Get the Smart Inspection Template Conf */
        //Query
        var sQueryOptions = `$filter=TemplateArea eq '${psTemplateArea}'`;
        //Read Parameters
        var oPromise = context.read('/SmartInspections/Services/SAM.service', 'LTTemplateConfigSet', [], sQueryOptions).then(
            function (results) {
                //return the Results
                var aConfigs = [];
                //Prepare the Array
                results.forEach(function (oValue) {
                    aConfigs.push(oValue);
                });
                return aConfigs;
            });

        return oPromise;
    } //readConfigs()


    static buildConfigsforArea(context, psTemplateArea) {

        var oPromiseConfigs = this.readConfigs(context, psTemplateArea);
        var bHasConnection = this.hasConnection(context);
        var sTempTypeAI = context.getGlobalDefinition('/SmartInspections/Globals/TextTemplates/TYPE_AI.global').getValue();
        var that = this;
        return Promise.all([oPromiseConfigs]).then(function (params) {
            let aConfigs = params[0];
            let aItems = [];
            let bEnabled = true;
            for (var i = 0; i < aConfigs.length; i++) {

                bEnabled = true;
                if (aConfigs[i].TempRowType === sTempTypeAI) { //If RESTService only available when connection is there
                    bEnabled = bHasConnection;
                }
                if (!bEnabled) {
                    continue;
                }
                aItems.push({
                    "TemplateArea": aConfigs[i].TemplateArea,
                    "TemplateID": aConfigs[i].TemplateID,
                    "TempRowType": aConfigs[i].TempRowType,
                    "TempRowTypeText": aConfigs[i].TempRowTypeText,
                    "TempShortText": aConfigs[i].TempShortText,
                    "ConfigShortText": aConfigs[i].ConfigShortText,
                    "Enabled": bEnabled
                });

            }//For
       
          
            return true;

        });

    }//buildConfigsforArea


}//Class