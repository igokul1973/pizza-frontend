import React, {
    createContext,
    useReducer,
    Reducer
} from 'react';
import cartReducer from '../reducers/cartReducer';
import ICartState from '../interfaces/ICartState';
import IAction from '../interfaces/IAction';

const initialState: ICartState = { items: [], dispatch: () => { } };

export const CartContext = createContext(initialState);

export const CartContextProvider: React.FC<{}> = ({ children }) => {
    const [cartState, dispatch] = useReducer<Reducer<ICartState, IAction<any>>>(
        cartReducer,
        initialState
    );

    return (
        <CartContext.Provider value={{ items: cartState.items, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};
