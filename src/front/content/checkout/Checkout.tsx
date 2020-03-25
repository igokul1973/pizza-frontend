import React, { useContext, useMemo, useState } from 'react';
import * as Yup from "yup";
import {
    makeStyles,
    Theme,
    createStyles
} from '@material-ui/core/styles';
import HeaderTitle from "../headerTitle/headerTitle";
import { Form, Formik } from "formik";
import {
    Button,
    Grid,
    Select, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    TextField,
    Typography
} from "@material-ui/core";
import FormField from "../../../components/inputs/FormField";
import MaskedPhoneInput from "../../../components/phone/MaskedPhoneInput";
import { useMutation, useQuery } from "@apollo/react-hooks";
import ICustomer from "../../../interfaces/ICustomer";
import IOrder, { OrderStatusEnum } from "../../../interfaces/IOrder";
import authDb, { IItem } from "../../../indexedDb";
import ICustomerAddress from "../../../interfaces/ICustomerAddress";
import IOrderItem from "../../../interfaces/IOrderItem";
import {
    CREATE_CUSTOMER,
    CREATE_CUSTOMER_ADDRESS,
    ADD_CUSTOMER_ADDRESS_CUSTOMER,
    CREATE_ORDER,
    ADD_CUSTOMER_ORDERS,
    CREATE_ORDER_ITEM,
    ADD_ORDER_ORDER_ITEMS
} from "./mutations";
import IAddRelationVariables from "../../../interfaces/IAddRelationVariables";
import IAddRelationPayload from "../../../interfaces/IAddRelationPayload";
import { CartContext } from "../../../context/cartContext";
import { Redirect } from "react-router";
import IProduct from "../../../interfaces/IProduct";
import { GET_PRODUCTS } from "../queries";
import Loading from "../../../components/loading/Loading";
import { toast } from "react-toastify";
import { EnumToArray, formatPrice, getTotal } from "../../../utilities";
import actionTypes from "../../../actions/actionTypes";

interface IFormValues {
    name: string
    phone: string
    email: string
    street: string
    city: string
    state: string
    zip: string
    addressCategory: AddressCategoryEnum | ''
    details: string
}

interface IItemRow {
    id: string
    name: string
    price: number
    quantity: number
}

enum AddressCategoryEnum {
    home = 'home',
    office = 'office',
    other = 'other'
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        desktopTable: {
            '& th': {
                fontWeight: 'bold'
            }
        },
    }),
);

const validationSchema = Yup.object({
    name: Yup.string().required(),
    phone: Yup.string().required(),
    email: Yup.string().required(),
    street: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    zip: Yup.string().required(),
    addressCategory: Yup.string().required()
});

const initialValues: IFormValues = {
    name: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    addressCategory: '',
    details: ''
};

const Checkout: React.FC<{}> = () => {

    const classes = useStyles();
    const { items, dispatch } = useContext(CartContext);
    const { loading, error, data } = useQuery<{ Product: IProduct[] }>(GET_PRODUCTS);

    const [redirect, setRedirect] = useState<undefined | string>(
        !items.length
            ? '/shopping-cart'
            : undefined
    );

    // Create Customer
    const [createCustomer] = useMutation<{ CreateCustomer: ICustomer }, Omit<ICustomer, 'id'>>(
        CREATE_CUSTOMER
    );
    // Create Customer address
    const [createCustomerAddress] = useMutation<{ CreateCustomerAddress: ICustomerAddress }, Omit<ICustomerAddress, 'id'>>(
        CREATE_CUSTOMER_ADDRESS
    );
    // Add Address to Customer
    const [addCustomerAddressCustomer] = useMutation<{ AddCustomerAddressCustomer: IAddRelationPayload<ICustomerAddress, ICustomer> },
        IAddRelationVariables>(
        ADD_CUSTOMER_ADDRESS_CUSTOMER
    );
    // Create Order
    const [createOrder] = useMutation<{ CreateOrder: IOrder }, Omit<IOrder, 'id'>>(
        CREATE_ORDER
    );
    // Create Order Items
    const [createOrderItem] = useMutation<{ CreateOrderItem: IOrderItem }, Omit<IOrderItem, 'id'>>(
        CREATE_ORDER_ITEM
    );
    // Add Order to Order Items
    const [addOrderOrderItems] = useMutation<{ AddOrderOrderItems: IAddRelationPayload<IOrder, IOrderItem> }, IAddRelationVariables>(
        ADD_ORDER_ORDER_ITEMS
    );
    // Add Order to Customer
    const [addCustomerOrders] = useMutation<{ AddCustomerOrders: IAddRelationPayload<ICustomer, IOrder> }, IAddRelationVariables>(
        ADD_CUSTOMER_ORDERS
    );

    const commitOrder = async (values: IFormValues, items: IItem[], products: IProduct[]): Promise<any> => {
        // For date-labeling created items
        const now = new Date().toISOString();
        // Create Customer
        const customerToCreate: Omit<ICustomer, "id"> = {
            name: values.name,
            phone: values.phone,
            email: values.email,
            // TODO: Security! Hash the password!!!
            password: 'password',
            createdAt: { formatted: now },
            updatedAt: { formatted: now },
        };

        const createCustomerResult = await createCustomer({
            variables: customerToCreate
        });
        const createdCustomer = createCustomerResult.data!.CreateCustomer;

        // Create Customer Address
        const customerAddressToCreate: Omit<ICustomerAddress, "id"> = {
            street: values.street,
            city: values.city,
            state: values.state,
            zip: values.zip,
            addressCategory: values.addressCategory as AddressCategoryEnum
        };

        const createCustomerAddressResult = await createCustomerAddress({
            variables: customerAddressToCreate
        });
        const createdCustomerAddress = createCustomerAddressResult.data!.CreateCustomerAddress;

        // Add Address to Customer
        await addCustomerAddressCustomer({
            variables: {
                from: {
                    id: createdCustomer.id
                },
                to: {
                    id: createdCustomerAddress.id
                }
            }
        });

        // Create Order
        const orderToCreate: Omit<IOrder, "id"> = {
            details: values.details,
            status: OrderStatusEnum.ordered,
            createdAt: { formatted: now },
            updatedAt: { formatted: now },
        };

        const createOrderResult = await createOrder({
            variables: orderToCreate
        });
        const createdOrder = createOrderResult.data!.CreateOrder;


        // Create Order Items

        // Creating order items array here.
        // Using a combination of map and filter now but with large amounts
        // of data plain old `for` loop would be more effective
        const orderItemsToCreate = items.map(item => {
            const product = products.find(product => product.id === item.id);
            // May not find a product if it was deleted from DB
            if (!product) {
                return undefined;
            }
            return {
                productId: item.id,
                name: product.name,
                price: product.price,
                quantity: item.quantity
            }
        }).filter(item => item !== undefined);

        const coiPromises = orderItemsToCreate.map(oi => {
            return createOrderItem({
                variables: oi
            });
        });
        const createdOrderItemResults = await Promise.all(coiPromises);

        // Creating Order to Order Item relation
        const aooiPromises = createdOrderItemResults.map(coiRes => {
            const createdOrderItem = coiRes.data!.CreateOrderItem;
            const addOrderOrderItemsVariables = {
                from: {
                    id: createdOrder.id
                },
                to: {
                    id: createdOrderItem.id
                }
            };
            return addOrderOrderItems({
                variables: addOrderOrderItemsVariables
            });
        });

        await Promise.all(aooiPromises);

        // Add Order to Customer
        const addCustomerOrdersVariables = {
            from: {
                id: createdCustomer.id
            },
            to: {
                id: createdOrder.id
            }
        };
        addCustomerOrders({
            variables: addCustomerOrdersVariables
        });

        return createdOrder;
    };

    const onSubmit = async (values: IFormValues) => {
        try {
            // TODO: Here I also could return the new user address and save it
            // in the IndexedDB for future orders' automatic suggestion
            const createdOrder = await commitOrder(values, items, products);
            // Remove cart from DB
            await authDb.bulkRemove(items.map(item => item.id));
            // Remove cart from context
            dispatch({type: actionTypes.REMOVE_ALL_ITEMS});
            setRedirect(`/order-confirmation/${createdOrder.id}`);
        } catch (e) {
            const message = 'Oops! Something went wrong!';
            return toast(message, {
                type: 'error',
                position: toast.POSITION.TOP_CENTER
            });
        }
    };

    const products = (data && data.Product) ? data.Product : [];

    const total = useMemo(() => {
        return getTotal(items, products);
    }, [items, products]);


    const createData = (item: IItem, products: IProduct[]): IItemRow => {
        const product = products.find(product => product.id === item.id);
        return {
            id: product!.id,
            name: product!.name,
            price: product!.price,
            quantity: item.quantity,
        };
    };

    const orderTableRows = useMemo(() => {
        if (!items.length || !products.length) {
            return [];
        }
        return items.map(item => {
            return createData(item, products);
        })
    }, [items, products]);

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return (
            <HeaderTitle isError={true}>
                Oops! Something went wrong!
            </HeaderTitle>
        );
    }

    if (redirect) {
        return <Redirect to={redirect}/>;
    }

    const addressCategories = EnumToArray(AddressCategoryEnum);
    const addressCategoriesSelectItems = addressCategories.map(cat => {
        return { label: cat, value: cat };
    });

    return (
        <div className="checkout-component">
            <HeaderTitle>
                Checkout
            </HeaderTitle>
            <Grid
                container
                direction="column"
                spacing={5}
            >
                <Grid item container direction="column" spacing={4}>
                    <Grid item variant="h5" color="primary" component={Typography}>
                        Your order
                    </Grid>
                    <Grid item>
                        <TableContainer>
                            <Table
                                aria-label="Shopping cart"
                                className={classes.desktopTable}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Quantity</TableCell>
                                        <TableCell align="center">Price</TableCell>
                                        <TableCell align="center">Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderTableRows.map(({ id, name, price, quantity }) => {
                                        return (
                                            <TableRow key={name}>
                                                <TableCell align="center">{name}</TableCell>
                                                <TableCell align="center">{quantity}</TableCell>
                                                <TableCell align="center">${price}</TableCell>
                                                <TableCell
                                                    align="center">${formatPrice(price * quantity)}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    <TableRow>
                                        <TableCell align="right" colSpan={3}>
                                            <Typography variant={"h5"}>
                                                Your total:
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                        >
                                            <Typography variant={"h5"}>
                                                ${formatPrice(total)}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <Grid item>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {
                            ({dirty, isValid}) => {
                                const isFormValid = dirty && isValid;
                                return (
                                    <Form>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography variant="h5"
                                                            color="primary">
                                                    Customer details
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormField
                                                    name="name"
                                                    control={TextField}
                                                    placeholder="Full name"
                                                    autoFocus={true}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormField
                                                    name="email"
                                                    control={TextField}
                                                    placeholder="Email"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormField
                                                    control={MaskedPhoneInput}
                                                    name="phone"
                                                    label="Phone"
                                                    id="phone-input-mask"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="h5"
                                                            color="primary">
                                                    Delivery address
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormField
                                                    name="street"
                                                    control={TextField}
                                                    placeholder="Street"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormField
                                                    name="city"
                                                    control={TextField}
                                                    placeholder="City"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormField
                                                    name="state"
                                                    control={TextField}
                                                    placeholder="State"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormField
                                                    name="zip"
                                                    control={TextField}
                                                    placeholder="Zip code"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="h5"
                                                            color="primary">
                                                    Order details
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormField
                                                    name="addressCategory"
                                                    control={Select}
                                                    select={true}
                                                    selectOptions={addressCategoriesSelectItems}
                                                    placeholder="Order details"
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <FormField
                                                    name="details"
                                                    multiline
                                                    control={TextField}
                                                    placeholder="Order details"
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Button
                                                    disabled={!isFormValid}
                                                    color="primary"
                                                    type="submit"
                                                    variant="contained"
                                                >
                                                    Confirm your order
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                );
                            }
                        }
                    </Formik>
                </Grid>
            </Grid>
        </div>
    );
};

export default Checkout;
