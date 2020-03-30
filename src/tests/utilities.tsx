import React from 'react';
import { render } from "@testing-library/react";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import { BrowserRouter } from "react-router-dom";
import baseTheme from "../baseTheme";
import { CartContextProvider } from "../context/cartContext";
import { ThemeProvider } from '@material-ui/core/styles';
import { GET_PRODUCTS } from "../front/content/queries";

const getProduct = (id?: string) => {
    const products: Record<string, any> = {
        p1: {
            id: 'p1',
            name: "Pizza Napolitana",
            description: "Some description",
            price: 22.84,
            imgUrl: "https://pixur.com/bla/pizza",
            status: 'available',
            categories: [
                {
                    name: 'pizza',
                    __typename: 'ProductCategory'
                },
            ],
            createdAt: {
                year: 2010,
                month: 12,
                day: 23,
                hour: 3,
                minute: 23,
                second: 32,
                formatted: '2010-12-23',
                __typename: 'NeoDateTime'
            },
            updatedAt: {
                year: 2010,
                month: 12,
                day: 23,
                hour: 3,
                minute: 23,
                second: 32,
                formatted: '2010-12-23',
                __typename: 'NeoDateTime'
            },
            __typename: 'Product'
        },
        p2: {
            id: 'p2',
            name: "Pizza Margherita",
            description: "Some description",
            price: 22.84,
            imgUrl: "https://pixur.com/bla/pizza",
            status: 'available',
            categories: [
                {
                    name: 'pizza',
                    __typename: 'ProductCategory'
                },
            ],
            createdAt: {
                year: 2010,
                month: 12,
                day: 23,
                hour: 3,
                minute: 23,
                second: 32,
                formatted: '2010-12-23',
                __typename: 'NeoDateTime'
            },
            updatedAt: {
                year: 2010,
                month: 12,
                day: 23,
                hour: 3,
                minute: 23,
                second: 32,
                formatted: '2010-12-23',
                __typename: 'NeoDateTime'
            },
            __typename: 'Product'
        },
        p3: {
            id: 'p3',
            name: "Coca-cola",
            description: "Some description",
            price: 4.00,
            imgUrl: "https://pixur.com/bla/pizza",
            status: 'available',
            categories: [
                {
                    name: 'soft drink',
                    __typename: 'ProductCategory'
                },
            ],
            createdAt: {
                year: 2010,
                month: 12,
                day: 23,
                hour: 3,
                minute: 23,
                second: 32,
                formatted: '2010-12-23',
                __typename: 'NeoDateTime'
            },
            updatedAt: {
                year: 2010,
                month: 12,
                day: 23,
                hour: 3,
                minute: 23,
                second: 32,
                formatted: '2010-12-23',
                __typename: 'NeoDateTime'
            },
            __typename: 'Product'
        },
    };

    return (!!id)
        ? products[id] ? [products[id]] : []
        : Object.values(products);
};

export const getProductsMocks = (): MockedResponse[] => [
    {
        request: {
            query: GET_PRODUCTS
        },
        result: {
            data: {
                Product: getProduct()
            }
        }
    },
    {
        request: {
            query: GET_PRODUCTS,
            variables: { id: 'p1' }
        },
        result: {
            data: {
                Product: getProduct('p1')
            }
        }
    },
    {
        request: {
            query: GET_PRODUCTS,
            variables: { id: 'p4' }
        },
        result: {
            data: {
                Product: getProduct('p4')
            }
        }
    },
    {
        request: {
            query: GET_PRODUCTS,
            variables: { name: 'p4' }
        },
        error: new Error("Something went wrong")
    }
];

export const renderComponent = (Component: React.ComponentType, mocks?: MockedResponse[]) => {
    return render(
        <ErrorBoundary>
            <MockedProvider mocks={mocks || getProductsMocks()}>
                <BrowserRouter>
                    <ThemeProvider theme={baseTheme}>
                        <CartContextProvider>
                            <Component/>
                        </CartContextProvider>
                    </ThemeProvider>
                </BrowserRouter>
            </MockedProvider>
        </ErrorBoundary>
    );
};
