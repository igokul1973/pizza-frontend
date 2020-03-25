import ICustomer from "./ICustomer";

enum AddressCategoryEnum {
    home = 'home',
    office = 'office',
    other = 'other'
}

export default interface ICustomerAddress {
    id: string
    street: string
    city: string
    state: string
    zip: string
    addressCategory?: AddressCategoryEnum
    customer?: ICustomer[]
}
