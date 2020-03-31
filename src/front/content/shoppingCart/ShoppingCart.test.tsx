import React from 'react';
import { mocked } from "ts-jest/utils";
import { cleanup, fireEvent } from '@testing-library/react';
import db, { IItem } from "../../../indexedDb";
import { renderComponent } from "../../../tests/utilities";
import * as CartContext from "../../../context/cartContext";
import ShoppingCart from "./ShoppingCart";
import { waitFor } from "@testing-library/dom";
import _ from 'lodash';
import actionTypes from "../../../actions/actionTypes";

jest.mock('../../../indexedDb');

// `mocked` provides typings on mocked modules and their methods
const mockedDb = mocked(db);

let dbInsertSpy: jest.SpyInstance<Promise<string>, [string, number]>;
let dbRemoveSpy: jest.SpyInstance<Promise<void>, [string]>;

beforeEach(() => {
    dbInsertSpy = jest.spyOn(db, 'insert').mockImplementation((id: string, quantity: number) => {
        return Promise.resolve(id)
    });
    dbRemoveSpy = jest.spyOn(db, 'remove').mockImplementation((id: string) => {
        return Promise.resolve()
    });
});

afterAll(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
});

describe('Shopping Cart component with items', () => {
    it('loads and displays 2 shopping cart items in a table which can be removed or whose quantity can be changed', async () => {
        jest.spyOn(_, 'debounce').mockImplementation((fn: any) => fn);
        // jest.useFakeTimers();
        const items = [
            {id: 'p1', quantity: 3},
            {id: 'p3', quantity: 1},
        ];
        const dispatchMock = jest.fn();
        jest.spyOn(CartContext, 'useCartContext').mockImplementation(() => ({
            items,
            dispatch: dispatchMock
        }));
        const { findAllByLabelText, getAllByRole, getAllByTitle, debug, queryByRole } = renderComponent(ShoppingCart);
        // It renders the Loading spinner
        queryByRole('loading-alert');
        // It shows the table
        await findAllByLabelText('Shopping cart');
        // It has 2 rows with quantity number input each
        const inputs = getAllByRole('spinbutton') as HTMLInputElement[];
        // Inputs should have proper initial values
        expect(+inputs[0].value).toBe(items[0].quantity);
        expect(+inputs[1].value).toBe(items[1].quantity);
        // On input's change the DB update method is called with correct arguments
        const newQuantity = 4;
        fireEvent.change(inputs[0], {target: {value: newQuantity}});
        expect(dbInsertSpy).toBeCalledTimes(1);
        expect(dbInsertSpy).toBeCalledWith('p1', 4);
        await waitFor(() => {
            expect(dispatchMock).toBeCalledTimes(1);
            expect(dispatchMock).toBeCalledWith({type: actionTypes.UPDATE_ITEM_QUANTITY, payload: {item: {id: 'p1', quantity: 4}}});
            dispatchMock.mockReset();
        });
        // Clicking on Delete button will delete the item
        const deleteButtons = getAllByTitle('Delete button');
        fireEvent.click(deleteButtons[0]);
        expect(dbRemoveSpy).toBeCalledTimes(1);
        expect(dbRemoveSpy).toBeCalledWith('p1');
        await waitFor(() => {
            expect(dispatchMock).toBeCalledTimes(1);
            expect(dispatchMock).toBeCalledWith({ type: actionTypes.REMOVE_ITEM, payload: { id: 'p1' } });
        });
    });
});

describe('Shopping Cart component without items', () => {
    it('shows No Items message', async () => {
        const items: IItem[] = [];
        const dispatchMock = jest.fn();
        jest.spyOn(CartContext, 'useCartContext').mockImplementation(() => ({
            items,
            dispatch: dispatchMock
        }));
        const { findByText, debug, queryByRole } = renderComponent(ShoppingCart);
        // It renders the Loading spinner
        queryByRole('loading-alert');
        // It shows the table
        await findByText('There are no items in your shopping cart');
    });
});
