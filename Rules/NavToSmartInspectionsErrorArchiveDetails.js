export default function NavToSmartInspectionsErrorArchiveDetails(context) {
    let binding = context.getPageProxy().getActionBinding();

    // Create an error object, and store the error's info into this object. And save this into ClientData
    let errorObject = {
        'Message': binding.Message,
        'RequestBody': binding.RequestBody,
        'RequestURL': binding.RequestURL,
        'HTTPStatusCode': binding.HTTPStatusCode,
    };
    context.getPageProxy().getClientData().ErrorObject = errorObject;
    //alert(Object.entries(binding.AffectedEntity['@odata.readLink']));

    let queryOption = '';  

    return context.read('/SmartInspections/Services/SAM.service', binding.AffectedEntity['@odata.readLink'], [], queryOption).then(result => {
        //alert(result.length);
        if (result && result.length) {
            let resultItem = result.getItem(0);
            resultItem.ErrorObject = errorObject;
            context.getPageProxy().setActionBinding(resultItem);
            //alert(Object.entries(resultItem));
            return context.getPageProxy().executeAction('/SmartInspections/Actions/NavToSmartInspectionsErrorArchiveDetails.action');
        } else {
            return Promise.resolve(false);
        }
    });
}
