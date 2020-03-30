import React, {
    createContext,
    useReducer,
    Reducer, useContext
} from 'react';
import cartReducer from '../reducers/cartReducer';
import ICartState from '../interfaces/ICartState';
import IAction from '../interfaces/IAction';

const initialState: ICartState = { items: [], dispatch: () => { } };

export const CartContext = createContext(initialState);

export const useCartContext = () => useContext(CartContext);

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
