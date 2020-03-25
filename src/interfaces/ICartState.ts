import IAction from "./IAction";
import { IItem } from "../indexedDb";

export default interface ICartState {
	items: IItem[];
	dispatch: (action: IAction<any>) => void;
}
