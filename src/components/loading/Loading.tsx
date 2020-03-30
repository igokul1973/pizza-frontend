import React from 'react';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    loading: {
        height: '100vh',
    }
}));

const Loading: React.FC<{}> = () => {

    const classes = useStyles();
    return (
            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
                spacing={4}
                role="loading-alert"
                className={classes.loading}
            >
                <Grid item>
                    <Typography>
                        Please wait, loading...
                        </Typography>
                </Grid>
                <Grid item>
                    <CircularProgress size={80} />
                </Grid>
            </Grid>
    );
};

export default Loading;
