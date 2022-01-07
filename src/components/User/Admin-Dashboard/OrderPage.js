import { FormControl, InputLabel, MenuItem, Select , Grid, Paper, TextField, Typography, Box, Button, Container, Divider} from '@mui/material';
import React, {useState,useEffect} from 'react'
import { Link, useParams } from "react-router-dom";


const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/admin_func.php';

function OrderPage() {
    let { id} = useParams();
    const [order, setOrder] = useState({});
    const [billing, setBilling] = useState({});

    useEffect(() => {
        axios.post(API_PATH, {function: "get_order", orderID: id})
        .then( res => {
            setOrder(res.data);
        });

    }, []);

    useEffect(() => {
        axios.post(API_PATH, {function: "get_order_billing_info", orderID: id})
        .then( res => {
            setBilling(res.data);
        });
    }, [])


    const handleStatusChange = (event) => {
        setOrder({
            ...order,    //... sends the value with
            [event.target.name]: event.target.value.toString()
        });
        console.log(order);
        console.log(billing);
    };  

    const handleBillingChange = (event) => {
        setBilling({
            ...billing, 
            [event.target.name]: event.target.value
        });
        console.log(billing);
        console.log(order);
    }

    const handleSubmit = (event) => {
        axios.post(API_PATH, {function: "set_order_submit", orderID: id, order: order , billing: billing})
        .then( (res) => {
            if(res.data.sent){
                // Redirect
            }
        });
    }

    return (
        <div>
            <Grid container justifyContent="space-between">
                <Grid item xs={12}  md={12} md={2}>
                    <Button fullWidth size='large' sx={{height: 50}} variant='outlined'>
                        <Typography variant='button'>
                            <Link to='/user/orders/' style={{ textDecoration: 'none', color: 'inherit'}} >Go back</Link>
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}  md={12} md={2} justifyContent="space-between">
                    <Button fullWidth size='large' variant='contained' onClick={handleSubmit}>
                        <Typography variant='button'>
                            <Link to='/user/orders/' style={{ textDecoration: 'none', color: 'inherit'}} > Submit changes</Link>
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
            <Divider variant='fullWidth' sx={{mt:5 , mb:5}}/>
            <Container component="main">
                <Typography component="h1" variant="h5">
                        Order details
                    </Typography>
                <Box
                    sx={{
                        mt: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                    }}
                >
                    <Box noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}  md={4}>
                                <TextField
                                    fullWidth
                                    disabled
                                    name="order_id"
                                    label="Order ID"
                                    value={order.id || ''}
                                />
                            </Grid>
                            <Grid item xs={12}  md={4}>
                                <TextField
                                    fullWidth
                                    disabled
                                    name="customer_id"
                                    label="Customer ID"
                                    value={order.users_id || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8} md={6}>
                                <TextField
                                    fullWidth
                                    disabled
                                    name="order_date"
                                    label="Order Date"
                                    value={order.order_date || ''}
                                />
                            </Grid>
                            <Grid item xs={6} sm={4} md={6}>
                                <FormControl>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        fullWidth
                                        name="status"
                                        label="Status"
                                        value={parseInt(order.status) || 0}
                                        onChange={handleStatusChange}
                                    >
                                        <MenuItem value={0}>Incomplete</MenuItem>
                                        <MenuItem value={1}>Processing</MenuItem>
                                        <MenuItem value={2}>Shipped</MenuItem>
                                        <MenuItem value={3}>Delivered</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <Divider variant='fullWidth' sx={{mt:5 , mb:5}}/>
            <Container component="main">
                <Typography component="h1" variant="h5">
                        Billing Details
                    </Typography>
                <Box
                    sx={{
                        mt: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                    }}
                >
                    <Box noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={6}  md={6}>
                                <TextField
                                    fullWidth
                                    name="first_name"
                                    label="First Name "
                                    value={billing.first_name || ''}
                                    onChange={handleBillingChange}
                                />
                            </Grid>
                            <Grid item xs={6}  md={6}>
                                <TextField
                                    fullWidth
                                    name="last_name"
                                    label="Last Name "
                                    value={billing.last_name || ''}
                                    onChange={handleBillingChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    name="address1"
                                    label="Address 1 "
                                    value={billing.address1 || ''}
                                    onChange={handleBillingChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    name="address2"
                                    label="Address 2 "
                                    value={billing.address2 || ''}
                                    onChange={handleBillingChange}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextField
                                    fullWidth
                                    name="city"
                                    label="City "
                                    value={billing.city || ''}
                                    onChange={handleBillingChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    name="state"
                                    label="State "
                                    value={billing.state || ''}
                                    onChange={handleBillingChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    name="postal_code"
                                    label="Postal Code "
                                    value={billing.postal_code || ''}
                                    onChange={handleBillingChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    name="country"
                                    label="Country "
                                    value={billing.country || ''}
                                    onChange={handleBillingChange}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default OrderPage
