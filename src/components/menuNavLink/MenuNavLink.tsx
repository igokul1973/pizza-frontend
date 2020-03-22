import React from 'react';
import { Link, LinkProps } from '@material-ui/core';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useLinkStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textDecoration: 'none',
            '&:hover': {
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

interface IProps extends NavLinkProps {
    muiLinkProps?: LinkProps
}

const MenuNavLink: React.FC<IProps> = ({ children, muiLinkProps, ...otherProps }) => {

    const linkClasses = useLinkStyles();
    const typographyClasses = useTypographyStyles();

    const NavLinkRef = React.forwardRef<any, Partial<IProps>>((props, ref) => (
        <NavLink
            ref={ref}
            {...props}
            {...otherProps}
        >
            {children}
        </NavLink>
    ));

    return (
        <Link
            children={children}
            component={NavLinkRef}
            TypographyClasses={{
                colorPrimary: typographyClasses.colorPrimary
            }}
            classes={{
                root: linkClasses.root
            }}
            className={muiLinkProps && muiLinkProps.className}
            {...muiLinkProps}
        />
    )
}

export default MenuNavLink;
