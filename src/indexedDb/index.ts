import Dexie from "dexie";

export interface IItem {
	id: string;
	quantity: number;
}

// Subclass it
class IndexedDb extends Dexie {
	items!: Dexie.Table<IItem, string>;
	constructor() {
		super("innoscripta_shopping_cart");
		this.version(1).stores({
			items: "id, quantity"
		});
		this.items = this.table("items");
	}

	/**
	 * Get all shopping cart items.
	 * return {Promise<IItem[]>}
	 */
	get(id: string): Promise<IItem> {
		return this.items.get(id);
	}

	/**
	 * Get all shopping cart items.
	 * return {Promise<IItem[]>}
	 */
	getAll(): Promise<IItem[]> {
		return this.items.toArray();
	}

	/**
	 * Insert items.
	 * @param {string} id
	 * @param {number} quantity
	 * @return {Promise<string>}
	 */
	insert(id: string, quantity: number): Promise<string> {
		return this.items.put({ id, quantity });
	}

	/**
	 * Bulk insert shopping car items
	 * @param {IItem[]} items
	 * @return {Promise<string>}
	 */
	bulkInsert(items: IItem[]): Promise<string> {
		return this.items.bulkPut(items);
	}
	/**
	 * Remove item.
	 * @param {string} id
	 * @return {Promise<void>}
	 */
	remove(id: string): Promise<void> {
		return this.items.delete(id);
	}

	/**
	 * Bulk remove operation.
	 * @param {string[]} ids
	 * @return {Promise<void>}
	 */
	bulkRemove(ids: string[]): Promise<void> {
		return this.items.bulkDelete(ids);
	}
}

const authDb = new IndexedDb();

export default authDb;
