import IProduct from "./IProduct";
import IOrder from "./IOrder";

export default interface IOrderItem {
    id: string
    name: string // Copied from the product on order item's creation
    price: number // Copied from the product on order item's creation
    quantity: number
    productId: string
    total?: number // Calculable field - calculated by DB
    order?: IOrder
}
