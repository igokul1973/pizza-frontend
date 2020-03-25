import ICustomer from "./ICustomer";
import IOrderItem from "./IOrderItem";
import IDateTime from "./IDateTime";

export enum OrderStatusEnum {
    ordered = 'ordered',
    delivered = 'delivered',
    cancelled = 'cancelled'
}

export default interface IOrder extends IDateTime {
    id: string
    details: string
    status: OrderStatusEnum
    orderItems?: IOrderItem[]
    customer?: ICustomer
}
