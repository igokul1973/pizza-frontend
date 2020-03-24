import React, {useCallback, useContext, useMemo, useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCTS, TGetProductVariables } from '../queries';
import IProduct from '../../../interfaces/IProduct';
import {
    Grid,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TextField,
    Button,
    Hidden,
    Paper,
    Typography,
    useTheme,
    useMediaQuery
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    makeStyles,
    Theme,
    createStyles
} from '@material-ui/core/styles';
import HeaderTitle from '../headerTitle/headerTitle';
import Loading from '../../../components/loading/Loading';
import { formatPrice } from '../../../utilities/index';
import { CartContext } from '../../../context/cartContext';
import authDb, { IItem } from '../../../indexedDb';
import actionTypes from '../../../actions/actionTypes';
import Link from '../../../components/link/Link';
import {toast} from "react-toastify";
import {debounce} from "lodash";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        imgRoot: {
            width: 140,
            height: 100
        },
        img: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        title: {
            fontWeight: 'bold'
        },
        desktopTable: {
            '& th': {
                fontWeight: 'bold'
            }
        },
        mobileTable: {
            border: `0.5px solid ${theme.palette.primary.light}`,
            marginBottom: '1rem',
            '& th': {
                fontWeight: 'bold'
            }
        },
        center: {
            textAlign: 'center'
        },
        centerLink: {
            display: 'block',
            width: '100%',
            textAlign: 'center'
        },
        deleteIcon: {
            cursor: 'pointer'
        }
    }),
);

interface IItemRow {
    id: string
    image: string
    name: string
    price: number
    quantity: number
    total: number
}

const ShoppingCart: React.FC<{}> = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isLargerThanSm = useMediaQuery(theme.breakpoints.up('sm'));
    const { items, dispatch } = useContext(CartContext);
    const [updatedItems, setUpdatedItems] = useState<IItem[]>([]);
    const { loading, error, data } = useQuery<{ Product: IProduct[] }, TGetProductVariables>(
        GET_PRODUCTS,
        {
            variables: {
                filter: {
                    AND: [
                        { id_in: items.map(item => item.id) },
                        { status: "available" }
                    ]
                }
            }
        }
    );

    const products = (data && data.Product) ? data.Product : [];

    const getSubtotal = (items: IItem[], products: IProduct[]) => {
        if (!products || !items) {
            return 0;
        }
        const subtotalProducts = products.filter(product => {
            return items.map(item => item.id).includes(product.id)
        });
        return subtotalProducts.reduce((subtotal, product) => {
            return subtotal + (product.price * items.find(item => item.id === product.id)!.quantity)
        }, 0);
    };

    const subtotal = useMemo(() => {
        return getSubtotal(items, products);
    }, [items, products]);

    if (loading) {
        return <Loading />
    }
    if (error) {
        return (
            <div>{JSON.stringify(error, null, 2)}</div>
        )
    }

    const changeQuantity = (value: number, id: string) => {
        if (!value) {
            const message = 'Please set the value in the quantity field';
            return toast(message, {
                type: 'error',
                position: toast.POSITION.TOP_CENTER
            });
        }
        return updateCartItemQuantity(id, value)
            .then(_ => {
                const message = 'Shopping cart has been updated';
                toast(message, {
                    type: 'info',
                    position: toast.POSITION.TOP_CENTER
                });
            })
    };

    const debouncedChangeQuantity = debounce(changeQuantity, 1000);


    /**
     * Updates items if their quantity has changed
     */
    const updateCartItemQuantity = async (id: string, quantity: number) => {
        /*const itemsToUpdate = updatedItems.map((updatedItem) => {
            const product = products.find(product => product.id === updatedItem.id);
            if (product) {
                return { ...product, quantity: updatedItem.quantity };
            }
            return product;
        })
            .filter(updatedItem => updatedItem !== undefined) as IItem[];*/
        authDb.insert(id, quantity)
            .then(_ => {
                // itemsToUpdate.forEach((item) => {
                    dispatch({
                        type: actionTypes.UPDATE_ITEM_QUANTITY,
                        payload: { item: { id, quantity } }
                    });
                // })
            })
            .catch(e => {
                console.error(e);
            });
    };

    const deleteCartItem = (id: string) => {
        authDb.remove(id)
            .then(items => {
                dispatch({ type: actionTypes.REMOVE_ITEM, payload: { id } });
            })
            .catch(e => {
                console.error(e)
            });
    };


    const createData = (product: IProduct): IItemRow => {
        const item = items.find(item => item.id === product.id);
        const quantity = (item) ? item.quantity : 0;
        return {
            id: product.id,
            image: product.imgUrl,
            name: product.name,
            price: product.price,
            quantity: quantity,
            total: 200
        };
    };

    const createRows = (): IItemRow[] => {
        return products.map(product => {
            return createData(product);
        })
    };

    const renderDesktop = () => (
        <TableContainer component={Paper}>
            <Table
                aria-label="Shopping cart"
                className={classes.desktopTable}
            >
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Total</TableCell>
                        <TableCell align="center">Remove</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {createRows().map(({ id, image, name, price, quantity, total }) => {
                        if (updatedItems.length) {
                            const updatedProduct = updatedItems.find((updatedItem) => {
                                return updatedItem.id = id;
                            });
                            if (updatedProduct) {
                                quantity = updatedProduct.quantity;
                            }
                        }
                        return (
                            <TableRow key={name}>
                                <TableCell component="th" scope="row" className={classes.imgRoot}>
                                    <Link to={`/menu/${id}`}>
                                        <img
                                            src={image}
                                            alt={name}
                                            className={classes.img}
                                        />
                                    </Link>
                                </TableCell>
                                <TableCell align="center">{name}</TableCell>
                                <TableCell align="center">
                                    <TextField
                                        variant="outlined"
                                        defaultValue={quantity}
                                        type="number"
                                        inputProps={{min: 1}}
                                        InputProps={{
                                            style: { width: "5rem" }
                                        }}
                                        onChange={(e) => debouncedChangeQuantity(+e.target.value, id)}
                                    />
                                </TableCell>
                                <TableCell align="center">{price}</TableCell>
                                <TableCell align="center">{formatPrice(price * quantity)}</TableCell>
                                <TableCell align="center">
                                    <DeleteIcon
                                        color="error"
                                        onClick={() => deleteCartItem(id)}
                                        className={classes.deleteIcon}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );

    const renderMobile = () => (
        <>
            {
                createRows().map(({ id, image, name, price, quantity, total }) => (
                    <TableContainer key="name">
                        <Table
                            size="small"
                            aria-label="Shopping cart item"
                            className={classes.mobileTable}
                        >
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Name:
                                    </TableCell>
                                    <TableCell align="right" colSpan={2}>{name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Quantity</TableCell>
                                    <TableCell align="right">
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            defaultValue={quantity}
                                            type="number"
                                            inputProps={{
                                                min: 1
                                            }}
                                            InputProps={{
                                                style: { width: "5rem" }
                                            }}
                                            onChange={(e) => debouncedChangeQuantity(+e.target.value, id)}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <DeleteIcon
                                            color="error"
                                            onClick={() => deleteCartItem(id)}
                                            className={classes.deleteIcon}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Price:</TableCell>
                                    <TableCell align="right" colSpan={2}>${formatPrice(price)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Total:</TableCell>
                                    <TableCell
                                        align="right"
                                        colSpan={2}
                                        style={{ fontWeight: 'bold' }}
                                    >
                                        {formatPrice(price * quantity)}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                ))}
        </>
    );

    return (
        <>
            <HeaderTitle>
                Shopping Cart
            </HeaderTitle>
            {!products.length
                ? (
                    <>
                        <Typography variant="h4" className={classes.center}>
                            There are no items in your shopping cart
                        </Typography>
                        <Link
                            to="/menu"
                            muiLinkProps={{
                                variant: "h4",
                                className: classes.centerLink,
                                style: { display: 'block', width: "100%" }
                            }}
                        >
                            Keep on shopping!
                    </Link>
                    </>
                )
                : (
                    <>
                        <Hidden xsDown implementation="js">
                            {renderDesktop()}
                        </Hidden>
                        <Hidden smUp implementation="js">
                            {renderMobile()}
                        </Hidden>
                        <Grid
                            container
                            justify={isLargerThanSm ? "flex-end" : "flex-start"}
                            style={{ marginTop: '3rem' }}
                        >
                            <Grid
                                item
                                container
                                direction="column"
                                wrap="nowrap"
                                xs={12}
                                sm={6}
                            >
                                <Grid
                                    item
                                    align={isLargerThanSm ? 'left' : 'center'}
                                    component={Typography}
                                    variant="h2"
                                    xs={12}
                                >
                                    Cart totals
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <TableContainer>
                                        <Table
                                            size="small"
                                            aria-label="Shopping cart totals"
                                            className={classes.mobileTable}
                                        >
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th" scope="row">Subtotal:</TableCell>
                                                    <TableCell align="right" colSpan={2}>
                                                        ${formatPrice(subtotal)}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row">Total:</TableCell>
                                                    <TableCell align="right" colSpan={2}>
                                                        <Typography variant="h5">
                                                            ${formatPrice(subtotal)}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    component={Typography}
                                    variant="h2"
                                >
                                    <Button
                                        variant="contained"
                                        size="large"
                                        fullWidth={!isLargerThanSm}
                                        color="primary"
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                )
            }
        </>
    )
};

export default ShoppingCart;
