import isAndroid from './Common/IsAndroid';

export default function AttachmentList_Icon(controlProxy) {
    const readLink = controlProxy.binding['@odata.readLink'];
    if ((readLink.indexOf('lodata_sys_eid') !== -1)) {
        return [isAndroid(controlProxy) ? '/SAPAssetManager/Images/syncOnListIcon.android.png' : '/SAPAssetManager/Images/syncOnListIcon.png'];
    } else {
        return [];
    }
}

