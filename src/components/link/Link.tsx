import React from 'react';
import { Link as MuiLink, MuiLinkProps } from '@material-ui/core';
import { Link as RouterLink, RouterLinkProps, } from 'react-router-dom';
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

const useTypographyStyles = makeStyles((theme: Theme) =>
    createStyles({
        colorPrimary: {
            color: theme.palette.common.white
        }
    })
);

interface IProps extends RouterLinkProps {
    muiLinkProps?: MuiLinkProps
}

const Link: React.FC<IProps> = ({ children, ...otherProps }) => {

    const linkClasses = useLinkStyles();
    const typographyClasses = useTypographyStyles();

    const LinkRef = React.forwardRef<any, IProps>((props, ref) => (
        <MuiLink
            ref={ref}
            children={children}
            classes={{
                root: linkClasses.root
            }}
            className={props.muiLinkProps && props.muiLinkProps.className}
            TypographyClasses={{
                colorPrimary: typographyClasses.colorPrimary
            }}
            {...props.muiLinkProps} />
    ));

    return (
        <RouterLink
            component={LinkRef}
            {...otherProps}
        >
            {children}
        </RouterLink>
    )
}

export default Link;
