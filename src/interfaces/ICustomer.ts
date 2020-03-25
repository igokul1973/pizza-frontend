import ICustomerAddress from "./ICustomerAddress";
import IOrder from "./IOrder";
import IDateTime from "./IDateTime";

export default interface ICustomer extends IDateTime {
    id: string
    name: string
    phone: string
    email: string
    password: string
    addresses?: ICustomerAddress[]
    orders?: IOrder[]
}
