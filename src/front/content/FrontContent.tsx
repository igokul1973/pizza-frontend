import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PizzaMenu from './menu/PizzaMenu';
import AboutUs from './aboutUs/AboutUs';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import NotFound from './notFound/NotFound';
import Contact from './contact/Contact';
import ShoppingCart from './shoppingCart/ShoppingCart';
import Home from './home/Home';
import LoginForm from './login/LoginForm';
import Product from './menu/product/Product';
import Checkout from "./checkout/Checkout";
import OrderConfirmation from "./orderConfirmation/OrderConfirmation";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: `calc(100vh - 128px)`,
            marginTop: 64,
            padding: '2rem 2rem'
        }
    })
);

const FrontContent: React.FC<{}> = () => {
    const classes = useStyles();

    return (
        <main className={clsx('front-content-component', classes.root)}>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/menu/:id' component={Product} />
                <Route path='/menu' component={PizzaMenu} />
                <Route path='/about-us' component={AboutUs} />
                <Route path='/contact' component={Contact} />
                <Route path='/shopping-cart' component={ShoppingCart} />
                <Route path='/checkout' component={Checkout} />
                <Route path='/order-confirmation/:id' component={OrderConfirmation} />
                <Route path='/order-confirmation' component={OrderConfirmation} />
                <Route path='/login' component={LoginForm} />
                <Route component={NotFound} />
            </Switch>
        </main>
    );
}

export default FrontContent;
