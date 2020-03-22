import React from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import HeaderTitle from '../../headerTitle/headerTitle';
import Loading from '../../../../components/loading/Loading';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCTS, TGetProductVariables } from '../../queries';
import IProduct from '../../../../interfaces/IProduct';
import { Grid, Typography, TextField, Button, useMediaQuery, useTheme } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        imgRoot: {
            width: 700,
            height: 400
        },
        img: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        title: {
            fontWeight: 'bold'
        },
        center: {
            textAlign: 'center'
        }
    }),
)


const Product: React.FC<{}> = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isLargerThanMd = useMediaQuery(theme.breakpoints.up('md'));
    const { id } = useParams<{ id: string }>();
    const { loading, error, data } = useQuery<{ Product: IProduct[] }, TGetProductVariables>(
        GET_PRODUCTS,
        { variables: { id } }
    );

    if (loading) {
        return <Loading />
    }
    if (error) {
        return (
            <div>{JSON.stringify(error, null, 2)}</div>
        )
    }

    const product = data!.Product[0];

    return (
        <>
            <HeaderTitle>
                {product.name}
            </HeaderTitle>
            <Grid
                container
                justify="center"
                spacing={5}
            >
                <Grid
                    item
                    className={classes.imgRoot}
                    xs={12}
                    md={5}
                >
                    <img
                        src={product.imgUrl}
                        alt={product.name}
                        className={classes.img}
                    />
                </Grid>
                <Grid
                    item
                    container
                    alignItems={isLargerThanMd ? 'flex-start' : 'center'}
                    direction="column"
                    spacing={3}
                    xs={12}
                    md={5}
                >
                    <Grid item>
                        <Typography
                            variant='h4'
                            color="primary"
                        >
                            Price: ${product.price}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        container
                        spacing={2}
                    >
                        <Grid
                            item
                            container
                            spacing={2}
                        >
                            <Grid item
                                variant='h5'
                                component={Typography}
                                className={clsx(
                                    classes.title,
                                    !isLargerThanMd && classes.center
                                )}
                                xs={12}
                                md="auto"
                            >
                                Categories:
                            </Grid>
                            <Grid item
                                variant='h5'
                                component={Typography}
                                className={clsx(
                                    !isLargerThanMd && classes.center
                                )}
                                xs={12}
                                md="auto"
                            >
                                {product.categories.map(c => c.name).join(', ')}
                            </Grid>
                        </Grid>
                        <Grid item container spacing={4}>
                            <Grid item
                                variant='h5'
                                color="primary"
                                component={Typography}
                                xs={12}
                                className={clsx(
                                    !isLargerThanMd && classes.center
                                )}
                            >
                                {product.description}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item
                        container
                        direction={isLargerThanMd ? 'row' : 'column'}
                        spacing={2}
                        style={{ marginTop: 'auto' }}
                        alignItems="center"
                    >
                        <Grid item>
                            <TextField variant="outlined" value={1} />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                size="large"
                                color="secondary"
                            >
                                Add to cart
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
};

export default Product;