## SPE Asset Manager 2205 Implementation - Custom Enhancement
## Application ID in Mobile Service
* AssetManagerExt

## Dependent Project
AssetManagerExt [AssetManagerExt](https://github.com/Jowat-SAM/SAM2110_Ext)

## Project ( P* )
1. P1 - SAM2110 - Plant - 008 - Jun-2022
## Version ( V* )
###### Project - Version - Date - Initials - Responsible
1. P1 - V1 - 1-Feb-23 - RB - raguram.barathan@agcapps.com 

## Version History
1 .V1 - Asset Manager 2205 Implementation - Pilot

## Change History
###### Change ID - Date - Dev Initials- Description
1.  CR013 - 23-Feb-23 - RB - Screen Simplification Long Text Icon
2.  D070  - 28-Feb-23 - RB - Clock out Screen
3.  D062  - 01-Mar-23 - RB - Adhoc Catalog Profiles
4.  D072  - 02-Mar-23 - RB - Pass All Order by
5.  D058  - 07-Mar-23 - VN - Submit Tab REDRAW 
6.  D048  - 08-Mar-23 - RB - Equipment Screen
7.  D106  - 10-Mar-23 - RB - Simplified Closed button
8.  D111  - 13-Mar-23 - RB - Remove History option
9.  D108  - 13-Mar-23 - RB - Add Chanege Insp Type Button ins screen
10. D112  - 13-Mar-23 - RB - Increase Loading size of insp table
11. T014  - 16-Mar-23 - RB - Hide Pass ALL when no Pending MIC
12. T019  - 17-Mar-23 - RB - Hide Change Insp, Descope, Change EX when any MIC is descoped
13. T024  - 23-Mar-23 - RB - Pass Count in Equipment View
14. UAT019 - 29-Mar-23 - VN - Altering the Attachment Review Logic.
15. INC00073262-RT-PLANT - 22-Jun-23 - RB - Consider MIC Plant in EX and ADHOC lofic while Filtering
16. INC00074226-RT-ERROR - 13-Jul-23 - RB - Handle MIC TEMP SAVE error log to retain data in Tablet 
17. CHG00074716-CR-BRQ002 - 22-Aug-23 - RB - Adhoc Technical Object Add Location and Plant Section

## Pages Change History
###### Page Name - [Change ID]
1. InspectionCharacteristicDetailsList.page - [ CR013 , D108]
2. WorkOrderChangeStatusPopover.js [ D070 ]
3. PassAllButton_OnPress.js [ D072 ]
4. SmartInspectionsTabsView_OnPress.js [ D058 ]
5. TechnicalObjectDetailsListPage_Sort.js [ D048 ]
6. InspectionCharacteristicDetailsListPage_MorePopover [ D111 ]
7. PassAllButton_SetEnabled.js [ T014 ]
8. InspectionTypeButton_SetEnabled.js [ T019 ]
9. DescopeTypeButton_SetEnabled.js [ T019 ]
10. EXGroupButton_SetEnabled [ T019 ]
11. TechnicalObjectDetailsListPage_PassFixFailCount.js [ T024 ]
12. AttachmentList_DownloadOrOpen [ UAT019 ]
13. Attachment_SaveDownloaded [ UAT019 ]
14. EXGroup_CreateInsp.js [ INC00073262-RT-PLANT ]
15. AdHocAdTechObjAndInspChar_Create.js [ INC00073262-RT-PLANT , CHG00074716-CR-BRQ002 ]
16. SmartInspectionsErrorArchive_Message.js [ INC00074226-RT-ERROR ]
17. DownloadOfflineSAM.action [ INC00074226-RT-ERROR ]
18. ODataUploadFailureMessage.action [ INC00074226-RT-ERROR ]
19. SmartInspectionsErrorArchive.page [ INC00074226-RT-ERROR ]
20. CheckForSyncErrorsAfterDownloadSuccess [ INC00074226-RT-ERROR ]
21. AdHocTechnicalObjectListPage_Query.js [ CHG00074716-CR-BRQ002]
22. TechnicalObject_CreateEntity_ErrorMessage.action [ CHG00074716-CR-BRQ002]