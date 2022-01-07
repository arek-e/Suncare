import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';


import {useState, useEffect, useContext} from 'react'
import { UserContext } from '../UserContext';
import HeaderMUI from '../HeaderMUI';
import Copyright from '../Copyright';
const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/products_func.php'

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step, items, billing, pullBillingDetails, pullOrderItems) {
    switch (step) {
        case 0:
        return <AddressForm getBillingDetails={pullBillingDetails} />;
        case 1:
        return <PaymentForm />;
        case 2:
        return <Review getOrderItems={pullOrderItems} items={items} billingDetails={billing}/>;
        default:
        throw new Error('Unknown step');
    }
}

const theme = createTheme();

export default function Checkout(props) {

    const {account, setAccount} = useContext(UserContext)
    const [cartItems, setCartItems] = useState([]);
    
    useEffect(() => {
        if(account){
            let userID = parseInt(account.userid)
            axios.post(API_PATH, {function: "get_cart",userID: userID})
            .then( res => {
                //console.log("Getting cart");
                res.data.cart.map(item => (
                    axios.post(API_PATH, {function: "get_product", prodID: item.products_id})
                    .then( res2 => {
                        setCartItems(prevarray => [...prevarray, {product: res2.data, quantity: parseInt(item.amount)}])
                    })
                ))
            });
        }
    }, [account])

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const [orderItems, setOrderItems] = useState([])
  const pullOrderItems = (data) => { setOrderItems(data) }

  const [billingDetails, setBillingDetails] = useState({})
  const pullBillingDetails = (data) => { setBillingDetails(data) }

  const handlePlaceOrder = () => {
    if(account){
        let userID = parseInt(account.userid)
        axios.post(API_PATH,{function: "place_order", orderItems: orderItems, userID: userID, billingAddress: billingDetails})
        .then(res => {
            if(res.data.sent){
                setActiveStep(activeStep + 1);
            }
            console.log("Billing details", billingDetails);
        });
    }
  }

  return (
    <ThemeProvider theme={theme}>
        <HeaderMUI showCart={false} position="absolute"/>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
                Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            <>
                {activeStep === steps.length ? (
                <>
                    <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                    </Typography>
                </>
                ) : (
                <>
                    {getStepContent(activeStep, cartItems, billingDetails,  pullBillingDetails, pullOrderItems)}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                        </Button>
                    )}
                    {activeStep !== 2 && (
                        <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                        Next
                        </Button>
                    )}
                    {activeStep == 2 && (
                        <Button variant="contained" onClick={handlePlaceOrder} sx={{ mt: 3, ml: 1 }}>
                        Place order
                        </Button>
                    )}
                    </Box>
                </>
                )}
            </>
            </Paper>
            <Copyright />
        </Container>
    </ThemeProvider>
  );
}