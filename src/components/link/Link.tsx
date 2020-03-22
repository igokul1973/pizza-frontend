import React from 'react';
import { Link as MuiLink, LinkProps } from '@material-ui/core';
import { Link as RouterLink, LinkProps as RouterLinkProps, } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useLinkStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:hover': {
                textDecoration: 'none',
            }
        }
    })
);

interface IProps extends RouterLinkProps {
    muiLinkProps?: LinkProps
}

const Link: React.FC<IProps> = ({ children, muiLinkProps, ...otherProps }) => {

    const linkClasses = useLinkStyles();

    const LinkRef = React.forwardRef<any, Partial<IProps>>((props, ref) => (
        <RouterLink
            ref={ref}
            {...props}
            {...otherProps}
        >
            {children}
        </RouterLink>
    ));

    return (
        <MuiLink
            children={children}
            component={LinkRef}
            classes={{
                root: linkClasses.root
            }}
            className={muiLinkProps && muiLinkProps.className}
            {...muiLinkProps}
        />
    )
}

export default Link;
