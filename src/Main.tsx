import React, { useContext, useState, useEffect } from 'react';
import Front from "./front/Front";
import { Route, Switch } from "react-router";
import Loading from './components/loading/Loading';
import db from './indexedDb';
import actionTypes from './actions/actionTypes';
import { CartContext } from './context/cartContext';

const Main: React.FC<{}> = () => {

    const { dispatch } = useContext(CartContext);
    const [loading, setLoading] = useState<boolean>(true);

    // Add shopping cart items from IndexedDB back to context
    // in case the user already started shopping but reloaded page...
    useEffect(() => {
        db.getAll()
            .then(items => {
                if (items.length) {
                    dispatch({ type: actionTypes.SEED_CART, payload: { items } });
                }
            })
            .catch(e => {
                console.error(e)
            })
            .finally(() => {
                setLoading(false);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    if (loading) {
        return <Loading />;
    }

    return (
        <Switch>
            <Route path='/' component={Front} />
        </Switch>
    )
};

export default Main;
