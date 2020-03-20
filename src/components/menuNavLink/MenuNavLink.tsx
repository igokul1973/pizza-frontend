import React from 'react';
import { Link, LinkProps } from '@material-ui/core';
import { NavLink, NavLinkProps, } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useLinkStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:hover': {
                // textDecoration: 'none',
            }
        }
    })
);

const useTypographyStyles = makeStyles((theme: Theme) =>
    createStyles({
        colorPrimary: {
            color: theme.palette.common.white
        }
    })
);

const MenuNavLink: React.FC<NavLinkProps & LinkProps> = ({ children, ...otherProps }) => {

    const linkClasses = useLinkStyles();
    const typographyClasses = useTypographyStyles();

    const NavLinkRef = React.forwardRef<any, NavLinkProps>((props, ref) => (
        <NavLink ref={ref} {...props} />
    ));

    return (
        <Link
            classes={{
                root: linkClasses.root
            }}
            TypographyClasses={{
                colorPrimary: typographyClasses.colorPrimary
            }}
            className={clsx(otherProps.className)}
            component={NavLinkRef}
            {...otherProps}
        >
            {children}
        </Link>
    )
}

export default MenuNavLink;
