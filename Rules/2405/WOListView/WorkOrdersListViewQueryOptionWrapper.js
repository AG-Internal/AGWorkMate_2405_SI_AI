import ValidationLibrary from '../../../../SAPAssetManager/Rules/Common/Library/ValidationLibrary';
import PersonaLibrary from '../../../../SAPAssetManager/Rules/Persona/PersonaLibrary';
import WorkOrdersFSMQueryOption from '../../../../SAPAssetManager/Rules/WorkOrders/ListView/WorkOrdersFSMQueryOption';
import WorkOrdersListViewQueryOption from '../../../../SAPAssetManager/Rules/WorkOrders/ListView/WorkOrdersListViewQueryOption';
import { WorkOrderLibrary } from '../../../../SAPAssetManager/Rules/WorkOrders/WorkOrderLibrary';
import WorkOrderListViewSetCaption from '../../../../SAPAssetManager/Rules/WorkOrders/WorkOrderListViewSetCaption';
import CommonLibrary from '../../../../SAPAssetManager/Rules/Common/Library/CommonLibrary';
//import InspectionsSIOrderQuery from './InspectionsSIOrderQuery';
import InspectionsSIOrderQuery from './InspectionsSIOrderQueryNew';

/** @param {IControlProxy} clientAPI */
export default async function WorkOrdersListViewQueryOptionWrapper(clientAPI) {
    if (CommonLibrary.getPageName(clientAPI) === 'WorkOrdersListViewPage') {
      //  WorkOrderListViewSetCaption(clientAPI.getPageProxy());
    }

    const { triggeredFrom: trigger } = clientAPI.getAppClientData();
    const builder = WorkOrdersListViewQueryOption(clientAPI);

    // Inline fetch and apply SI Order exclusion/inclusion filter
    if (trigger === 'INSPECTIONS' || trigger === 'WORK_ORDERS_OVP_TITLE') {
        // Read SI orders
        const results = await clientAPI.read(
            '/SmartInspections/Services/SAM.service',
            'WorkOrderHeaderSet',
            []
        );
        const orders = [];
        (results || []).forEach(item => {
            if (!orders.includes(item.OrderNumber)) {
                orders.push(item.OrderNumber);
            }
        });
        // Build filter expression: include SI orders for INSPECTIONS, exclude for others
        let siFilter = '';
        if (orders.length === 0) {
            siFilter = trigger === 'INSPECTIONS'
                ? "OrderId eq '1234564'"
                : "OrderId ne '1234564'";
        } else {
            siFilter = orders
                .map(id => trigger === 'INSPECTIONS'
                    ? `OrderId eq '${id}'`
                    : `OrderId ne '${id}'`
                )
                .join(trigger === 'INSPECTIONS' ? ' or ' : ' and ');
        }
        builder.filter(siFilter);
    }

    // Apply FSM filter for Field Service Technicians
    if (PersonaLibrary.isFieldServiceTechnician(clientAPI)) {
        const fsmFilter = await WorkOrdersFSMQueryOption(clientAPI);
        if (!ValidationLibrary.evalIsEmpty(fsmFilter)) {
            builder.filter(fsmFilter);
        }
    }

    // Apply WCM filter for WCM Operators
    if (PersonaLibrary.isWCMOperator(clientAPI)) {
        const filterWCM = WorkOrderLibrary.getWCMWorkOrdersFilter(clientAPI);
        if (builder.hasFilter) {
            builder.filter().and(filterWCM);
        } else {
            builder.filter(filterWCM);
        }
    }

    return builder;
}
