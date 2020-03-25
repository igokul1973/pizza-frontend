import React from 'react';
import { Typography } from '@material-ui/core';

const HeaderTitle: React.FC<{isError?: boolean}> = ({ children, isError = false }) => (
    <Typography
        variant="h1"
        align="center"
        color={isError ? "error" : "secondary"}
        style={{ marginBottom: "3rem" }}
    >
        {children}
    </Typography>
);

export default HeaderTitle;
