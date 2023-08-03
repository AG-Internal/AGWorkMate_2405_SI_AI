export function getInspMenuItems() {
    return [
        {
            '_Name': 'RR_PASS',
            'Image': '$(PLT, /SAPAssetManager/Images/edit_context.png, /SAPAssetManager/Images/edit_context.android.png)',
            'Text': 'Record Result ( PASS )',
            'Mode': 'Normal',
            'OnSwipe': '/SmartInspections/Rules/InspCharContextMenu/onSwipeRR_PASS.js',
        },
        {
            '_Name': 'RR_FAIL',
            'Image': '$(PLT, /SAPAssetManager/Images/reject.png, /SAPAssetManager/Images/reject.android.png)',
            'Text': 'Descope MIC',
            'Mode': 'Deletion',
            'OnSwipe': '/SmartInspections/Rules/InspCharContextMenu/onSwipeRR_FAIL.js',
        },
        {
            '_Name': 'RR_NOTE',
            'Image': 'sap-icon://notes',
            'Text': 'Add Note',
            'Mode': 'Normal',
            'OnSwipe': '/SmartInspections/Rules/InspCharContextMenu/onSwipeRR_NOTE.js',
        },
        {
            '_Name': 'RR_ATTACH',
            'Image': 'sap-icon://add-photo',
            'Text': 'Add Attachment',
            'Mode': 'Normal',
            'OnSwipe': '/SmartInspections/Rules/InspCharContextMenu/onSwipeRR_ATTACH.js',
        },
        {
            '_Name': 'RR_SCOPEBACK',
            'Image': '$(PLT, /SAPAssetManager/Images/edit_context.png, /SAPAssetManager/Images/edit_context.android.png)',
            'Text': 'Bring Back to Scope',
            'Mode': 'Normal',
            'OnSwipe': '/SmartInspections/Rules/InspCharContextMenu/onSwipeRR_SCOPEBACK.js',
        }



    ];
}

export function getLeadingItems(psCallFor) {
    var aItems = [];
    switch (psCallFor) {
        case "NO_RESULT":
            aItems = ["RR_PASS"];
            break;
        case "HAS_RESULT":
            aItems = ["RR_NOTE"];
            break;
            case "DESCOPED":
            aItems = ["RR_SCOPEBACK"];
            break;
        default:
            aItems = [];

    }

    return aItems;
}

export function getTrailingItems(psCallFor) {
    var aItems = [];

    switch (psCallFor) {

        case "NO_RESULT":
            aItems = ["RR_FAIL"];
            break;

        case "HAS_RESULT":
            aItems = ["RR_ATTACH"];
            break;

        default:
            aItems = [];

    }

    return aItems;
}