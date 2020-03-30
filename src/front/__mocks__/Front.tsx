import React, { useContext } from 'react';
import { CartContext } from "../../context/cartContext";
import { IItem } from "../../indexedDb";

const Front: React.FC<{}> = () => {
    const {items} = useContext(CartContext);
    return (
        <div>
            Mock Home Component
            {items.map((item: IItem) => (
                <div data-testid="item" key={item.id}>
                    <div>{item.id}</div>
                    <div>{item.quantity}</div>
                </div>
            ))}
        </div>
    )
};

export default Front;
