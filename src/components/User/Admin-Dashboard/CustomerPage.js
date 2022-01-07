import { FormControl, InputLabel, MenuItem, Select , Grid, Paper, TextField, Typography, Box, Button, Container, Divider} from '@mui/material';
import React, {useState,useEffect} from 'react'
import { Link, useParams } from "react-router-dom";


const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/admin_func.php';

function CustomerPage() {
    let { id } = useParams();
    const [customer, setCustomer] = useState({});


    useEffect(() => {
        axios.post(API_PATH, {function: "get_customer", customerID: id})
        .then( res => {
            setCustomer(res.data);
        });

    }, []);

    const handleCustomerChange = (event) => {
        setCustomer({
            ...customer,    //... sends the value with
            [event.target.name]: event.target.value
        });
        console.log(customer);
    };  

    const handleSubmit = (event) => {
        axios.post(API_PATH, {function: "set_customer_submit", customerID: id, customer: customer})
        .then( (res) => {
            if(res.data.sent){
                // Redirect
            }
        });
    }

    return (
        <div>
            <Grid container justifyContent="space-between">
                <Grid item xs={12}  sm={12} md={2}>
                    <Button fullWidth size='large' sx={{height: 50}} variant='outlined'>
                        <Typography variant='button'>
                            <Link to='/user/customers/' style={{ textDecoration: 'none', color: 'inherit'}} >Go back</Link>
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}  sm={12} md={2} justifyContent="space-between">
                    <Button fullWidth size='large' variant='contained' onClick={handleSubmit}>
                        <Typography variant='button'>
                            <Link to='/user/customers/' style={{ textDecoration: 'none', color: 'inherit'}} > Submit changes</Link>
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
            <Divider variant='fullWidth' sx={{mt:5 , mb:5}}/>
            <Container component="main">
                <Typography component="h1" variant="h5">
                        Account Details
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
                                    name="customer_id"
                                    label="Customer ID"
                                    value={customer.id || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8} md={6}>
                                <TextField
                                    fullWidth
                                    disabled
                                    name="created"
                                    label="Account created"
                                    value={customer.created || ''}
                                />
                            </Grid>
                            <Grid item xs={6} sm={4} md={6}>
                                <FormControl>
                                    <InputLabel>Is Admin?</InputLabel>
                                    <Select
                                        fullWidth
                                        name="adminFlag"
                                        label="Admin Flag"
                                        value={customer.adminFlag || 0}
                                        onChange={handleCustomerChange}
                                    >
                                        <MenuItem value={0}>No</MenuItem>
                                        <MenuItem value={1}>Yes</MenuItem>
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
                        General Details
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
                                    value={customer.first_name || ''}
                                    onChange={handleCustomerChange}
                                />
                            </Grid>
                            <Grid item xs={6}  md={6}>
                                <TextField
                                    fullWidth
                                    name="last_name"
                                    label="Last Name "
                                    value={customer.last_name || ''}
                                    onChange={handleCustomerChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    name="phone_number"
                                    label="Phonenumber"
                                    value={customer.phone_number || ''}
                                    onChange={handleCustomerChange}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default CustomerPage
