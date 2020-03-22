import React from 'react';
import { Link, MuiLinkProps } from '@material-ui/core';
import { Link as RouterLink, NavLinkProps, } from 'react-router-dom';
import clsx from 'clsx';
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
    muiLinkProps?: MuiLinkProps
}

const MenuNavLink: React.FC<IProps> = ({ children, ...otherProps }) => {

    const linkClasses = useLinkStyles();
    const typographyClasses = useTypographyStyles();

    const NavLinkRef = React.forwardRef<any, IProps>((props, ref) => (
        <Link
            ref={ref}
            children={children}
            classes={{
                root: linkClasses.root
            }}
            className={props.muiLinkProps && props.muiLinkProps.className}
            TypographyClasses={{
                colorPrimary: typographyClasses.colorPrimary
            }}
            {...props.muiLinkProps}
        />
    ));

    return (
        <RouterLink
            component={NavLinkRef}
            {...otherProps}
        >
            {children}
        </RouterLink>
    )
}

export default MenuNavLink;
