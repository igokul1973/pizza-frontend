import React from 'react';
import { Typography } from '@material-ui/core';

const NotFound: React.FC<{}> = () => {
    return (
        <div className="about-us-component">
            <Typography variant="h1" color="error">
                Oops!
            </Typography>
            <Typography variant="h3" color="error">
                Page is not found!
            </Typography>
        </div>
    );
}

export default NotFound;
