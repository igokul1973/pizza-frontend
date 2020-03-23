import React from 'react';
import { useParams } from 'react-router-dom';
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
        }
    }),
)

interface IItemRow {
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
    const { id } = useParams<{ id: string }>();
    const { loading, error, data } = useQuery<{ Product: IProduct[] }, TGetProductVariables>(
        GET_PRODUCTS,
        { variables: { id } }
    );

    if (loading) {
        return <Loading />
    }
    if (error) {
        return (
            <div>{JSON.stringify(error, null, 2)}</div>
        )
    }

    const product = data!.Product[0];
    const products = [1, 2, 3].map(l => product);

    const createData = (product: IProduct): IItemRow => {
        return {
            image: product.imgUrl,
            name: product.name,
            price: product.price,
            quantity: 1,
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
                    {createRows().map(({ image, name, price, quantity, total }) => (
                        <TableRow key={name}>
                            <TableCell component="th" scope="row" className={classes.imgRoot}>
                                <img
                                    src={image}
                                    alt={name}
                                    className={classes.img}
                                />
                            </TableCell>
                            <TableCell align="center">{name}</TableCell>
                            <TableCell align="center">
                                <TextField
                                    variant="outlined"
                                    value={quantity}
                                    InputProps={{
                                        style: { width: "5rem" }
                                    }}
                                />
                            </TableCell>
                            <TableCell align="center">{price}</TableCell>
                            <TableCell align="center">{total}</TableCell>
                            <TableCell align="center"><DeleteIcon color="error" /></TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell align="right" colSpan={6}>
                            <Button
                                variant="contained"
                                size="large"
                                color="secondary"
                                style={{ marginLeft: 'auto' }}
                            >
                                Update Cart
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );

    const renderMobile = () => (
        <>
            {
                createRows().map(({ image, name, price, quantity, total }) => (
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
                                            value={quantity}
                                            InputProps={{
                                                style: { width: "5rem" }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <DeleteIcon color="error" />
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
                                        ${formatPrice(total)}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                ))}

            <Grid
                container
                justify={isLargerThanSm ? "flex-end" : "flex-start"}
            >
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth={!isLargerThanSm}
                        color="secondary"
                    >
                        Update Cart
                    </Button>
                </Grid>
            </Grid>
        </>
    );

    return (
        <>
            <HeaderTitle>
                Shopping Cart
            </HeaderTitle>
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
                                        <TableCell align="right" colSpan={2}>${formatPrice(1000)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Total:</TableCell>
                                        <TableCell align="right" colSpan={2}>
                                            <Typography variant="h5">
                                                ${formatPrice(1000)}
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
};

export default ShoppingCart;
