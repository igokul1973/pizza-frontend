import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Menu from './menu/Menu';
import AboutUs from './aboutUs/AboutUs';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import NotFound from './notFound/NotFound';
import Contact from './contact/Contact';
import ShoppingCart from './shoppingCart/ShoppingCart';
import Home from './home/Home';
import LoginForm from './login/LoginForm';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
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
                <Route path='/menu' component={Menu} />
                <Route path='/about-us' component={AboutUs} />
                <Route path='/contact' component={Contact} />
                <Route path='/shopping-cart' component={ShoppingCart} />
                <Route path='/login' component={LoginForm} />
                <Route component={NotFound} />
            </Switch>
        </main>
    );
}

export default FrontContent;
