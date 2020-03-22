import React from 'react';
import { Typography } from '@material-ui/core';

const HeaderTitle: React.FC<{}> = ({ children }) => (
    <Typography
        variant="h1"
        align="center"
        color="secondary"
        style={{ marginBottom: "3rem" }}
    >
        {children}
    </Typography>
);

export default HeaderTitle;