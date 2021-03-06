import React from 'react';
import Main from "./Main";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { BrowserRouter } from "react-router-dom";
import baseTheme from './baseTheme';
import { ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from "@material-ui/core";
import { CartContextProvider } from './context/cartContext';

interface IProps {
    client: ApolloClient<any>
}

const App: React.FC<IProps> = ({ client }) => {

    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <ThemeProvider theme={baseTheme}>
                    <CartContextProvider>
                        <CssBaseline />
                        <Main />
                    </CartContextProvider>
                </ThemeProvider>
            </BrowserRouter>
        </ApolloProvider >
    );
}

export default App;