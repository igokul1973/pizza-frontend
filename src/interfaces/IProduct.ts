import IDateTime from "./IDateTime";

enum ProductStatusEnum {
	available = "available",
	not_available = "not_available"
}

export default interface IProduct extends IDateTime {
	id: string;
	name: string;
	description: string;
	price: number;
	status: ProductStatusEnum;
}
