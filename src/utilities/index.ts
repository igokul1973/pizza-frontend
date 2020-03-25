import INeo4jDateTime from "../interfaces/INeo4jDateTime";
import { IItem } from "../indexedDb";
import IProduct from "../interfaces/IProduct";

export const formatPrice = (price: number) => {
	return price.toFixed(2);
};

export const toDateTime = (date: INeo4jDateTime) => {
    return `${date.year}-${(date.month! < 10) ? '0'+date.month : date.month}-${(date.day! < 10) ? '0'+date.day : date.day} ${date.hour}:${(date.minute! < 10) ? '0'+date.minute : date.minute}:${date.second}`;
};

// Turn enum into array
export const EnumToArray = (stringEnum: Record<string, string>) => {
    return Object.keys(stringEnum)
        .map(key => stringEnum[key]);
};


export const getTotal = (items: IItem[], products: IProduct[]) => {
    if (!products || !items) {
        return 0;
    }
    const subtotalProducts = products.filter(product => {
        return items.map(item => item.id).includes(product.id)
    });
    return subtotalProducts.reduce((subtotal, product) => {
        return subtotal + (product.price * items.find(item => item.id === product.id)!.quantity)
    }, 0);
};
