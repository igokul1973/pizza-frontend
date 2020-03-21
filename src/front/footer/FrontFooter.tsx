import React from 'react';
import clsx from 'clsx';
import { AppBar, CssBaseline, Toolbar, Link, Hidden } from '@material-ui/core';
import MenuNavLink from '../../components/menuNavLink/MenuNavLink';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        appBar: {
            width: '100%',
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        toolbarRoot: {
            justifyContent: 'space-between'
        },
        menuButton: {
            marginRight: 36,
        },
        sectionDesktop: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
        },
    }),
)

const FrontFooter: React.FC<{}> = () => {

    const classes = useStyles();

    return (
        <div className="front-footer-component">
            <CssBaseline />
            <AppBar
                component="nav"
                position="static"
                className={clsx(classes.appBar)}
            >
                <Toolbar classes={{
                    root: classes.toolbarRoot
                }}>
                    <div className={classes.sectionDesktop}>
                        <Hidden smDown implementation="js">
                            <MenuNavLink to="/about-us" variant="h5">
                                About Us
                            </MenuNavLink>
                            <Link href="https://innoscripta.com/" variant="body1" style={{ color: 'white' }}>
                                Created as a test drive for Innoscripta GMBH &#9400; 2020
                            </Link>
                            <MenuNavLink to="/contact" variant="h5">
                                Contact
                            </MenuNavLink>
                        </Hidden>
                        <Hidden mdUp implementation="js">
                            <Link href="https://innoscripta.com/" variant="body1" style={{ color: 'white' }}>
                                Created for Innoscripta GMBH &#9400; 2020
                            </Link>
                        </Hidden>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default FrontFooter;
