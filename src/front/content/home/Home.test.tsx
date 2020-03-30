import React from 'react';
import Home, { getGalleryItems } from "./Home";
import { getProductsMocks, renderComponent } from "../../../tests/utilities";
import ImageGallery from "../../../components/imageGallery/ImageGallery";
import { ExecutionResult } from 'apollo-link';
import IProduct from "../../../interfaces/IProduct";

jest.mock('../../../components/imageGallery/ImageGallery', () => {
    return jest.fn(() => null)
});

describe('Home page', () => {
    it('loads and renders gallery and promotion', async () => {
        const { getByRole, findByTestId, queryAllByRole } = renderComponent(Home);
        // It renders the Loading spinner
        getByRole('loading-alert');
        // Then it renders the Home component
        await findByTestId('home-component');
        // it renders the image gallery passing there 3 products as props
        expect(ImageGallery).toHaveBeenCalledTimes(1);
        const result = getProductsMocks()[0].result! as ExecutionResult<{Product: IProduct[]}>;
        const expectedProps = {
            'data-testid': 'gallery',
            galleryItems: getGalleryItems(result.data!.Product)
        };
        expect(ImageGallery).toHaveBeenCalledWith(expectedProps, {});
        // it renders three images after the gallery as a promotion on a page
        const images = queryAllByRole('img');
        expect(images).toHaveLength(3);
    });
});
