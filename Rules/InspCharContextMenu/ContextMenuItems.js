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
        }

    ];
}

export function getLeadingItems() {
    return [
        "RR_PASS"
    ];
}

export function getTrailingItems() {
    return [
        "RR_FAIL"
    ];
}