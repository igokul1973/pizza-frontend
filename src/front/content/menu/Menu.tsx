import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCTS } from './queries';
import IProduct from '../../../interfaces/IProduct';
import Loading from '../../../components/loading/Loading';
import { Typography } from '@material-ui/core';

const Menu: React.FC<{}> = () => {
    const { loading, error, data } = useQuery<{ products: IProduct }>(GET_PRODUCTS);
    if (loading) {
        return <Loading />
    }
    if (error) {
        return (
            <div>
                <pre>
                    {JSON.stringify(error, null, 2)}
                </pre>
            </div>
        )
    }
    return (
        <div className="menu-component">
            <Typography variant="h1">
                Menu
            </Typography>
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
}

export default Menu;
