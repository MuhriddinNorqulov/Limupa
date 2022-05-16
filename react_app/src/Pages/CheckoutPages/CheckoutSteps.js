import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {Link} from "react-router-dom";

export const steps = [
    {title: "Login", slug: '/login', number: 1},
    {title: 'Shipping Address', slug: '/checkout/shipping', number: 2},
    {title: 'Payment Method', slug: '/checkout/payment', number: 3},
    {title: 'Place Order', slug: '/checkout/place-order', number: 4},

];

function CheckoutSteps({index}) {
    return (
        <Box sx={{ width: '60%', margin: 'auto', marginBottom: '46px' }}>
            <Stepper  activeStep={index-1} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label.number}>
                        {(label.number < index)
                            ? <Link to={label.slug}>
                                <StepLabel>{label.title}</StepLabel>
                            </Link>
                            :<StepLabel>{label.title}</StepLabel>
                        }

                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}

export default CheckoutSteps