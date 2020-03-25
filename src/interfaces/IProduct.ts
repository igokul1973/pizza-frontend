import IDateTime from "./IDateTime";
import IProductCategory from "./IProductCategory";

export enum ProductStatusEnum {
	available = "available",
	not_available = "not_available"
}

export default interface IProduct extends IDateTime {
	id: string;
	name: string;
	description: string;
	price: number;
	status: ProductStatusEnum;
	imgUrl: string;
	categories: IProductCategory[];
}
