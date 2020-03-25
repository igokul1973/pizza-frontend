import actionTypes from "../actions/actionTypes";
import IAction from "../interfaces/IAction";
import ICartState from "../interfaces/ICartState";

export default function cartReducer(
	state: ICartState,
	action: IAction<any>
): ICartState {
	switch (action.type) {
		case actionTypes.SEED_CART:
			return { ...state, items: action.payload.items };
		case actionTypes.ADD_ITEM:
			const addItemIndex = state.items.findIndex(
				item => item.id === action.payload.item.id
			);
			if (addItemIndex !== -1) {
				const quantity =
					state.items[addItemIndex].quantity +
					action.payload.item.quantity;
				state.items[addItemIndex].quantity = quantity;
				return { ...state, items: [...state.items] };
			}
			return { ...state, items: [...state.items, action.payload.item] };
		case actionTypes.UPDATE_ITEM_QUANTITY:
			const updateItemIndex = state.items.findIndex(
				item => item.id === action.payload.item.id
			);
			if (updateItemIndex !== -1) {
				state.items[updateItemIndex].quantity =
					action.payload.item.quantity;
				return { ...state, items: [...state.items] };
			}
			return state;
		case actionTypes.REMOVE_ITEM:
			const removeItemIndex = state.items.findIndex(
				item => item.id === action.payload.id
			);
			state.items.splice(removeItemIndex, 1);
			return { ...state, items: [...state.items] };
		case actionTypes.REMOVE_ALL_ITEMS:
			return { ...state, items: [] };
		default:
			return state;
	}
}
