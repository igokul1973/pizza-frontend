import React, { Fragment } from 'react';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCTS } from '../queries';
import IProduct from '../../../interfaces/IProduct';
import Loading from '../../../components/loading/Loading';
import { Typography, Grid } from '@material-ui/core';
import Link from '../../../components/link/Link';
import MenuCard from './MenuCard';
import HeaderTitle from '../headerTitle/headerTitle';

const PizzaMenu: React.FC<{}> = () => {
    const { loading, error, data } = useQuery<{ Product: IProduct[] }>(GET_PRODUCTS);
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

    const products = data!.Product;
    const date = moment(new Date()).format('DD MMMM YYYY');

    const getProductCategories = (items: IProduct[]): string[] => {
        const categories = new Set<string>();
        items.forEach(item => {
            item.categories.map(cat => cat.name)
                .forEach(category => categories.add(category))
        });
        return Array.from(categories).sort();
    };

    const getProductsByCategory = (items: IProduct[], category: string) => {
        return items.filter(item => item.categories.some((cat) => cat.name === category));
    }

    return (
        <div className="menu-component">
            <HeaderTitle>
                Our Menu
            </HeaderTitle>
            {
                getProductCategories(products).map(category => (
                    <Fragment key={category}>
                        <Typography
                            variant='h4'
                            align="center"
                            color="primary"
                            style={{ marginBottom: "2rem" }}
                        >
                            {category.toUpperCase()}
                        </Typography>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            spacing={3}
                            style={{ paddingBottom: '2rem' }}
                        >
                            {
                                getProductsByCategory(products, category).map(product => (
                                    <Grid item key={product.name}>
                                        <Link to={`/menu/${product.id}`}>
                                            <MenuCard
                                                name={product.name}
                                                description={product.description}
                                                imgUrl={product.imgUrl}
                                                price={product.price}
                                                date={date}
                                                abbrev={category.substring(0, 1)}
                                            />
                                        </Link>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Fragment>
                ))
            }
        </div>
    );
}

export default PizzaMenu;
