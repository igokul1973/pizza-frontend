import React, { useState } from 'react';
import Front from "./front/Front";
import { Route, Switch } from "react-router";
import Loading from './components/loading/Loading';

const Main: React.FC<{}> = () => {

    const [loading] = useState<boolean>(false);

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
