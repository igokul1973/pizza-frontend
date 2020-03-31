import React from 'react';
import { mocked } from "ts-jest/utils";
import { cleanup } from '@testing-library/react';
import db, { IItem } from "./indexedDb";
import { renderComponent } from "./tests/utilities";
import Main from "./Main";

jest.mock('./indexedDb');
jest.mock('./front/Front');

const getAllItems = () => {
    return Promise.resolve([
        { id: 'p1', quantity: 3 },
        { id: 'p2', quantity: 5 },
    ]);
};

// `mocked` provides typings on mocked modules and their methods
const mockedDb = mocked(db);

afterAll(() => {
    cleanup();
    jest.resetAllMocks();
});

describe('Main component', () => {
    it('loads and updates the context with 2 shopping cart items', async () => {
        const promise = getAllItems() as unknown;
        mockedDb.getAll.mockResolvedValue(promise as Promise<IItem[]>);
        const { getByRole, findByText, queryAllByTestId } = renderComponent(Main);
        const loadingComponent = getByRole('loading-alert');
        expect(loadingComponent).toBeInTheDocument();
        expect(mockedDb.getAll).toHaveBeenCalled();
        const homeComponent = await findByText('Mock Home Component');
        expect(homeComponent).toBeInTheDocument();
        const items = queryAllByTestId('item');
        expect(items.length).toBe(2);
    });
});
