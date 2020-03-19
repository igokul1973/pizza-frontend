import React from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { BrowserRouter } from "react-router-dom";
import "@fortawesome/fontawesome-free/scss/fontawesome.scss";
import "@fortawesome/fontawesome-free/scss/brands.scss";
import "@fortawesome/fontawesome-free/scss/regular.scss";
import "@fortawesome/fontawesome-free/scss/solid.scss";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import { ErrorResponse } from "apollo-link-error";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import Main from "./Main";
import { ApolloProvider } from "@apollo/react-hooks";
import defaultClientState from "./graphql/defaultClientState";
import baseTheme from './baseTheme';
import { ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from "@material-ui/core";

const cache = new InMemoryCache({
    cacheRedirects: {
        Query: {
            // Redirecting GET_COMPANIES request to cache if company id is provided
            Company: (_, args, { getCacheKey }) => {
                if (args && args.id) {
                    return getCacheKey({ __typename: "Company", id: args.id });
                }
            }
        }
    }
});

const stateLink = {
    cache,
    defaults: defaultClientState,
};

// Catching all GraphQL and network errors here
const onError = ({ graphQLErrors, networkError }: ErrorResponse) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);
};

const client = new ApolloClient({
    cache,
    uri: "http://localhost:4001/graphql",
    clientState: stateLink,
    onError
});

client.onResetStore(async () => {
    return cache.writeData({ data: defaultClientState });
});

toast.configure();

const App: React.FC<{}> = () => {

    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <ThemeProvider theme={baseTheme}>
                    <CssBaseline />
                    <Main />
                </ThemeProvider>
            </BrowserRouter>
        </ApolloProvider >
    );
}

ReactDOM.render(<App />, document.getElementById("root"));

if ((module as any).hot && process.env.NODE_ENV !== "production") {
    (module as any).hot.accept("./Main", () => {
        ReactDOM.render(<App />, document.getElementById("root"));
    });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();