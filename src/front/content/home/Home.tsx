import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCTS } from '../queries';
import Loading from '../../../components/loading/Loading';
import IProduct from '../../../interfaces/IProduct';
import { Typography } from '@material-ui/core';
import ImageGallery from '../../../components/imageGallery/ImageGallery';

const Home: React.FC<{}> = () => {
    const { loading, error, data } = useQuery<{ Product: IProduct[] }>(GET_PRODUCTS);

    if (loading) {
        return <Loading />
    }

    if (error) {
        return (
            <div>
                <pre>
                    {JSON.stringify(error, null, 2)}
                </pre>
            </div>
        )
    }

    const getGalleryItems = (items: IProduct[]) => {
        return items.map((item, index) => {
            return { src: item.imgUrl, index };
        });
    };

    return (
        <div className="home-component">
            <ImageGallery galleryItems={getGalleryItems(data!.Product)} />
            <Typography variant="h1">
                Home
            </Typography>
        </div>
    );
}

export default Home;
