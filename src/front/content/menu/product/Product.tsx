import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import HeaderTitle from '../../headerTitle/headerTitle';
import Loading from '../../../../components/loading/Loading';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCTS, TGetProductVariables } from '../../queries';
import IProduct from '../../../../interfaces/IProduct';
import { Grid, Typography, TextField, Button, useMediaQuery, useTheme } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import authDb from '../../../../indexedDb/index';
import { CartContext } from '../../../../context/cartContext';
import actionTypes from '../../../../actions/actionTypes';
import {toast} from "react-toastify";
import { formatPrice } from "../../../../utilities";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        imgRoot: {
            width: 700,
            height: 400
        },
        img: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        title: {
            fontWeight: 'bold'
        },
        center: {
            textAlign: 'center'
        }
    }),
);


const Product: React.FC<{}> = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isLargerThanMd = useMediaQuery(theme.breakpoints.up('md'));
    const { id } = useParams<{ id: string }>();
    const [quantity, setQuantity] = useState<number|"">(1);
    const { dispatch } = useContext(CartContext);
    const { loading, error, data } = useQuery<{ Product: IProduct[] }, TGetProductVariables>(
        GET_PRODUCTS,
        { variables: { id } }
    );

    if (loading) {
        return <Loading />
    }

    if (error) {
        return (
            <HeaderTitle isError={true}>
                Oops! Something went wrong!
            </HeaderTitle>
        );
    }

    const product = data!.Product[0];

    const changeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(+event.target.value);
    };

    const addToCart = async (id: string, quantity: number | "") => {
        if (!quantity) {
            const message = 'Please set the value in the quantity field';
            return toast(message, {
                type: 'error',
                position: toast.POSITION.TOP_CENTER
            });
        }
        const item = await authDb.get(id);
        let dbQuantity = quantity;
        if (item) {
            dbQuantity = quantity + item.quantity;
        }
        authDb.insert(id, dbQuantity)
            .then(res => {
                dispatch({ type: actionTypes.ADD_ITEM, payload: { item: { id, quantity } } });
                const message = 'Item added to cart';
                toast(message, {
                    type: 'info',
                    position: toast.POSITION.TOP_CENTER
                });
            })
            .catch(e => {
                console.error(e);
            });
    };

    return (
        <>
            <HeaderTitle>
                {product.name}
            </HeaderTitle>
            <Grid
                container
                justify="center"
                spacing={5}
            >
                <Grid
                    item
                    className={classes.imgRoot}
                    xs={12}
                    md={5}
                >
                    <img
                        src={product.imgUrl}
                        alt={product.name}
                        className={classes.img}
                    />
                </Grid>
                <Grid
                    item
                    container
                    alignItems={isLargerThanMd ? 'flex-start' : 'center'}
                    direction="column"
                    spacing={3}
                    xs={12}
                    md={5}
                >
                    <Grid item>
                        <Typography
                            variant='h4'
                            color="primary"
                        >
                            Price: ${formatPrice(product.price)}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        container
                        spacing={2}
                    >
                        <Grid
                            item
                            container
                            spacing={2}
                        >
                            <Grid item
                                variant='h5'
                                component={Typography}
                                className={clsx(
                                    classes.title,
                                    !isLargerThanMd && classes.center
                                )}
                                xs={12}
                                md="auto"
                            >
                                Categories:
                            </Grid>
                            <Grid item
                                variant='h5'
                                component={Typography}
                                className={clsx(
                                    !isLargerThanMd && classes.center
                                )}
                                xs={12}
                                md="auto"
                            >
                                {product.categories.map(c => c.name).join(', ')}
                            </Grid>
                        </Grid>
                        <Grid item container spacing={4}>
                            <Grid item
                                variant='h5'
                                color="primary"
                                component={Typography}
                                xs={12}
                                className={clsx(
                                    !isLargerThanMd && classes.center
                                )}
                            >
                                {product.description}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item
                        container
                        direction={isLargerThanMd ? 'row' : 'column'}
                        spacing={2}
                        style={{ marginTop: 'auto' }}
                        alignItems="center"
                    >
                        <Grid item>
                            <TextField
                                variant="outlined"
                                type="number"
                                inputProps={{min: 1}}
                                value={quantity}
                                onChange={changeQuantity}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                size="large"
                                color="secondary"
                                onClick={() => addToCart(product.id, quantity)}
                            >
                                Add to cart
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
};

export default Product;
