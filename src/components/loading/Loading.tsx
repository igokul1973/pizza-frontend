import React from 'react';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    loading: {
        display: 'flex',
        height: '100vh',
        margin: '20% 0'
    }
}));

const Loading: React.FC<{}> = () => {

    const classes = useStyles();
    return (
        <div className={classes.loading}>
            <Grid
                container
                direction="column"
                alignItems="center"
                spacing={4}
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
        </div>
    );
};

export default Loading;