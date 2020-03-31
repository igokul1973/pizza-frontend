import React, { Consumer, Context, useContext } from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import Product from './Product';
import { renderComponent } from "../../../../tests/utilities";
import router from 'react-router';
import db from "../../../../indexedDb";
import { waitFor } from "@testing-library/dom";
import * as CartContext from "../../../../context/cartContext";

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
});

describe('Product page - success', () => {
    it('should render product page with image and button which adds a product to the cart', async () => {
        const id = 'p1';
        const quantity = 3;
        // Mocking the param
        jest.spyOn(router, 'useParams').mockReturnValue({ id });
        // Spying on CartContext calls and mocking its dispatch function
        const dispatchMock = jest.fn();
        jest.spyOn(CartContext, 'useCartContext').mockImplementation(() => ({
            items: [],
            dispatch: dispatchMock
        }));
        const dbGetSpy = jest.spyOn(db, 'get').mockImplementation(() => Promise.resolve(undefined));
        const dbInsertSpy = jest.spyOn(db, 'insert').mockImplementation((id: string, quantity: number) => {
            return Promise.resolve(id)
        });

        const { getAllByRole, getByRole, findByTestId, getByTestId, debug, queryByRole } = renderComponent(Product);
        // It renders the Loading spinner
        queryByRole('loading-alert');
        // Then it renders the Product component
        await findByTestId('product-component');
        // it renders one Product image on a page
        const images = getAllByRole('img');
        expect(images).toHaveLength(1);
        // it renders the Add to Cart input
        const input = getByRole('spinbutton');
        // it renders the Add to Cart button
        const button = getByTestId('add-to-cart-button');
        // Clicking on the button adds product item to the cart
        fireEvent.change(input, { target: { value: quantity } });
        fireEvent.click(button);
        // It called the IndexedDB GET method with correct values
        await waitFor(() => {
            expect(dbGetSpy).toHaveBeenCalled();
            expect(dbGetSpy).toHaveBeenCalledWith(id);
        });
        // It called the IndexedDB INSERT method and context with correct values
        await waitFor(() => {
            expect(dbInsertSpy).toHaveBeenCalledTimes(1);
            expect(dbInsertSpy).toHaveBeenCalledWith(id, quantity);
            expect(dispatchMock).toHaveBeenCalledTimes(1);
            expect(dispatchMock).toHaveBeenCalledWith({
                type: 'ADD_ITEM',
                payload: {item: {id, quantity}}
            });
        });
    });
});

describe('Product page - failure', () => {
    it('should return error header for non-existing product', async () => {
        // Mocking the param
        jest.spyOn(router, 'useParams').mockReturnValue({ id: 'p4' });
        const { queryByRole, findByText } = renderComponent(Product);
        // It renders the Loading spinner
        queryByRole('loading-alert');
        // Then it renders the page with the error header
        await findByText('There is no products with given ID');
    })
});
