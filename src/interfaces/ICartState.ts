import { IItem } from "../indexedDb/index";
import IAction from "./IAction";

export default interface ICartState {
	items: IItem[];
	dispatch: (action: IAction<any>) => void;
}
