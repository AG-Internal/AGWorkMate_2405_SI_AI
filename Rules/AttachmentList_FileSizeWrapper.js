import DocumentFileSize from './Common/DocumentFileSize';

export default function AttachmentList_FileSizeWrapper(sectionProxy) {
    return DocumentFileSize(sectionProxy, sectionProxy.binding);
}
