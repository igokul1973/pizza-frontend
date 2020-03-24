import React, { useContext, useState, useEffect } from 'react';
import Front from "./front/Front";
import { Route, Switch } from "react-router";
import Loading from './components/loading/Loading';
import authDb from './indexedDb';
import actionTypes from './actions/actionTypes';
import { CartContext } from './context/cartContext';

const Main: React.FC<{}> = () => {

    const { dispatch } = useContext(CartContext);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        authDb.getAll()
            .then(items => {
                dispatch({ type: actionTypes.SEED_CART, payload: { items } });
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
}

export default Main;
