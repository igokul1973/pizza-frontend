import React from 'react';
import { createStyles, makeStyles, Theme, fade } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
    CssBaseline,
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    Badge,
    SwipeableDrawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import HistoryIcon from '@material-ui/icons/History';
import GroupIcon from '@material-ui/icons/Group';
import MoreIcon from '@material-ui/icons/More';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { AccountCircle } from '@material-ui/icons';
import MenuNavLink from '../../components/menuNavLink/MenuNavLink';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
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
        searchWrapper: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                width: '55%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
            },
            [theme.breakpoints.up('md')]: {
                width: '30%',
            },
        },
        searchContracted: {
            width: 0,
            transition: 'width 0.3s'
        },
        searchExpanded: {
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            width: '100%',
            transition: 'width 0.3s'
        },
        searchIcon: {
            paddingRight: theme.spacing(1),
            paddingLeft: theme.spacing(1),
            display: 'flex',
            justifyContent: 'center',
            zIndex: 1
        },
        inputRoot: {
            color: 'inherit',
            width: '100%',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 3),
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                width: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around'
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    }),
);

const useDrawerStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            width: theme.verticalMenu.width,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        paper: {
            color: 'white',
            backgroundColor: theme.palette.secondary.main
        },
        drawerOpen: {
            width: theme.verticalMenu.width,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            overflowX: 'hidden',
            width: 0,
            [theme.breakpoints.up('lg')]: {
                width: theme.spacing(9) + 1,
            },
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        link: {
            display: 'block',
            borderBottom: '1px white solid'
        },
        listItemIconRoot: {
            color: 'inherit',
        }
    })
);

const DashboardHeader: React.FC<{}> = () => {

    const classes = useStyles();
    const drawerClasses = useDrawerStyles();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState<boolean>(false);
    const [searchExpanded, setSearchExpanded] = React.useState<boolean>(false);

    const onSearchIconClick = () => {
        setSearchExpanded(!searchExpanded);
    }

    const toggleMobileMenu = () => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const renderMobileMenu = (
        <SwipeableDrawer
            open={isMobileMenuOpen}
            onOpen={toggleMobileMenu()}
            onClose={toggleMobileMenu()}
            className={clsx(drawerClasses.drawer, {
                [drawerClasses.drawerOpen]: isMobileMenuOpen,
                // [drawerClasses.drawerClose]: !isOpen,
            })}
            classes={{
                paper: clsx(drawerClasses.paper, {
                    [drawerClasses.drawerOpen]: isMobileMenuOpen,
                    // [drawerClasses.drawerClose]: !isOpen,
                }),
            }}
        >
            <List>
                {
                    [
                        { to: '/menu', text: 'Our Menu', Icon: RestaurantMenuIcon },
                        { to: '/about-us', text: 'About us', Icon: GroupIcon },
                        { to: '/contact', text: 'Contact us', Icon: ContactSupportIcon },
                        { to: '/login', text: 'View Order History', Icon: HistoryIcon },
                    ].map(({ to, text, Icon }) => (
                        <MenuNavLink
                            key={to}
                            to={to}
                            className={drawerClasses.link}
                            activeClassName="activeVerticalMenuItem"
                            onClick={toggleMobileMenu()}
                        >
                            <ListItem>
                                <ListItemIcon
                                    classes={{
                                        root: drawerClasses.listItemIconRoot
                                    }}
                                >
                                    <Icon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        </MenuNavLink>
                    ))
                }
            </List>
        </SwipeableDrawer>
    );
    const mobileMenuId = 'menu-mobile';

    const renderShoppingCartLink = () => (
        <MenuNavLink to="/shopping-cart" muiLinkProps={{ variant: "h5" }} title="View shopping basket">
            <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="secondary">
                    <ShoppingBasketIcon />
                </Badge>
            </IconButton>
        </MenuNavLink>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                component="nav"
                position="fixed"
                className={clsx(classes.appBar)}
            >
                <Toolbar classes={{
                    root: classes.toolbarRoot
                }}>
                    <div className='logo'>
                        <MenuNavLink to="/" muiLinkProps={{ variant: "h5" }}>
                            Pizza Store
                        </MenuNavLink>
                    </div>
                    <div className={classes.searchWrapper}>
                        <div className={(searchExpanded)
                            ? classes.searchExpanded
                            : classes.searchContracted}
                        >
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className={classes.searchIcon} onClick={onSearchIconClick}>
                            <SearchIcon />
                        </div>
                    </div>
                    <div className={classes.sectionDesktop}>
                        <MenuNavLink to="/menu" muiLinkProps={{ variant: "h5" }}>
                            Menu
                        </MenuNavLink>
                        <MenuNavLink to="/about-us" muiLinkProps={{ variant: "h5" }}>
                            About Us
                        </MenuNavLink>
                        <MenuNavLink to="/contact" muiLinkProps={{ variant: "h5" }}>
                            Contact
                        </MenuNavLink>
                        {renderShoppingCartLink()}
                        <MenuNavLink to="/login" muiLinkProps={{ variant: "h5" }} title="See order history">
                            <IconButton
                                edge="end"
                                aria-label="See order history link"
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </MenuNavLink>
                    </div>
                    <div className={classes.sectionMobile}>
                        {renderShoppingCartLink()}
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={toggleMobileMenu()}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </div >
    );
}

export default DashboardHeader;
