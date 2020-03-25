import React, { useState } from 'react';
import { Redirect, useParams } from "react-router";
import HeaderTitle from "../headerTitle/headerTitle";
import { Grid, Typography } from "@material-ui/core";

// TODO: This page could also check if the order actually exists
// and belongs to the user currently logged in, if at all. If I have time
// I'll implement it.
const OrderConfirmation: React.FC<{}> = () => {
    const {id} = useParams();
    const [isRedirect, setIsRedirect] = useState<boolean>(false);

    if (isRedirect) {
        return <Redirect to="/menu"/>
    }

    if (!id) {
        setIsRedirect(true);
    }

    return (
        <div className="order-confirmation-component">
            <HeaderTitle>
                Order confirmed
            </HeaderTitle>
            <Grid container direction="column" spacing={6}>
                <Grid item component={Typography} variant="h4" color="primary" style={{textAlign: 'center'}}>
                    Your order #{id} has been confirmed and will arrive within 30 minutes. Please refer to this number in case you have any questions. You will see this number on your receipt. Payments can be provided by cash or any credit card when your order has arrived.
                </Grid>
                <Grid item component={Typography} variant="h4" color="primary" style={{textAlign: 'center'}}>
                    Your order details "have been sent" to the email you have provided.
                </Grid>
                <Grid item component={Typography} variant="h4" color="error" style={{textAlign: 'center'}}>
                    Happy meal!
                </Grid>
            </Grid>
        </div>
    )
};

export default OrderConfirmation;
