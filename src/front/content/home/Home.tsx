import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCTS } from '../queries';
import Loading from '../../../components/loading/Loading';
import IProduct from '../../../interfaces/IProduct';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { deepOrange } from '@material-ui/core/colors/'
import AddIcon from '@material-ui/icons/Add';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import ImageGallery from '../../../components/imageGallery/ImageGallery';

const useStyles = makeStyles(theme => ({
    gallery: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'inherit'
        }
    },
    imgRoot: {
        outline: 0,
        height: 300,
        width: 400,
        overflow: 'hidden'
    },
    img: {
        height: '100%',
        width: '100%',
        objectFit: 'cover'
    }
}));

const Home: React.FC<{}> = () => {

    const theme = useTheme();
    const isLargerThanLg = useMediaQuery(theme.breakpoints.up('lg'));
    const classes = useStyles();
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

    const getRandomImageUrlByCategory = (items: IProduct[], category: string) => {
        const filteredItems = items.filter(item => item.categories.some((cat) => cat.name === category));
        const randomNumber = Math.floor(Math.random() * filteredItems.length);
        return filteredItems[randomNumber].imgUrl;
    }

    return (
        <div className="home-component">
            <div className={classes.gallery}>
                <Link to="/menu">
                    <ImageGallery galleryItems={getGalleryItems(data!.Product)} />
                </Link>
            </div>
            <Grid
                container
                direction="column"
                spacing={1}
                style={{ paddingBottom: '2rem' }}
            >
                <Grid item>
                    <Typography
                        variant="h2"
                        style={{ textAlign: 'center', color: deepOrange[500] }}
                    >
                        <Link to="/menu">
                            Dine-and-Dash Action! Only today!
                        </Link>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        variant="h2"
                        style={{ textAlign: 'center' }}
                    >
                        Buy two different pizzas - get a drink of your choice for free!
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                container
                direction={isLargerThanLg ? 'row' : 'column'}
                justify="center"
                alignItems="center"
                spacing={7}
            >
                <Grid item className={classes.imgRoot}>
                    <Link to="/menu">
                        <img className={classes.img} alt="" src={getRandomImageUrlByCategory(data!.Product, 'Pizza')} />
                    </Link>
                </Grid>
                <Grid item>
                    <Typography variant="h5">
                        <AddIcon fontSize="large" />
                    </Typography>
                </Grid>
                <Grid item className={classes.imgRoot}>
                    <Link to="/menu">
                        <img className={classes.img} alt="" src={getRandomImageUrlByCategory(data!.Product, 'Pizza')} />
                    </Link>
                </Grid>
                <Grid item >
                    <Typography variant="h1">
                        <DragHandleIcon fontSize="large" />
                    </Typography>
                </Grid>
                <Grid item className={classes.imgRoot}>
                    <Link to="/menu">
                        <img className={classes.img} alt="" src={getRandomImageUrlByCategory(data!.Product, 'Soft drink')} />
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;
