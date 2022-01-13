import React, {useState, useContext, useEffect } from 'react'
import Dashboard from '../components/User/Admin-Dashboard/Dashboard';
import HeaderMUI from '../components/HeaderMUI';
import Login from '../components/User/Login';
import { UserContext } from '../components/UserContext';
import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { purple, blue } from '@mui/material/colors';

const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/login_func.php'

function UserPage(props) {
    const {account, setAccount} = useContext(UserContext)
    const [admin, setAdmin] = useState(0)
    const [billing, setBilling] = useState( {
        first_name:'',
        last_name:'',
        address1:'',
        address2:'',
        city:'',
        state:'',
        postal_code:'',
        country:'',
    })

    useEffect(() => {
        setAccount(account);
        const admin =  new Object(account);
        isAdmin(admin);
        axios.post(API_PATH, {function: "get_address", account: account})
        .then(res => {
            console.log(res.data);
            if(res.data){
                setBilling(res.data);
            }

        });

    }, [account])

    const isAdmin = (data) => {
        let flag = parseInt(data.adminFlag)
        console.log("Account from isAdmin:", flag);
        setAdmin(flag);
    }
    
    const handleBillingChange = (event) => {
        setBilling({
            ...billing,    //... sends the value with
            [event.target.name]: event.target.value
        });
    }; 

    const handleAddressSubmit = () => {
        axios.post(API_PATH, {function: "submit_address", account: account, billing: billing})
        .then(res => {
            console.log(res.data.sent);
        });
    }   

    return (
        <div>
            {Boolean(account) ?
                <div>
                    {Boolean(admin) ? 
                            <div>
                                <Dashboard/>
                            </div>
                        :
                        <Box>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <HeaderMUI/> 
                                </Grid>
                            </Grid>
                            <Container component="main" maxWidth="md">
                                <Box sx={{mt: 4}}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sx={{mb:2}}>
                                            <Paper sx={{color: 'white', bgcolor: blue[700]}}>
                                                <Box sx={{ml: 2}}>
                                                    <Typography variant="h4">Welcome back {account.firstName}!</Typography>
                                                </Box>
                                            </Paper>
                                        </Grid>

                                        <Grid container item xs={12} lg={7}>
                                            <Grid item xs={12}>
                                                <Paper sx={{color: 'white', bgcolor: blue[700], height: 50}}>
                                                    <Box sx={{ml: 2, pt: 1.5}}>
                                                        <Typography variant="h6">Account details</Typography>
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                            <Paper sx={{p: 2, height: 290}}>
                                                <Grid container item spacing={2} xs={12}>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                fullWidth
                                                                disabled
                                                                name="id"
                                                                label="Account ID"
                                                                value={account.userid || ''}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                fullWidth
                                                                disabled
                                                                name="created"
                                                                label="Account Created"
                                                                value={account.created || ''}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                disabled
                                                                name="email"
                                                                label="Email"
                                                                value={account.email || ''}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                fullWidth
                                                                disabled
                                                                name="first_name"
                                                                label="First Name"
                                                                value={account.firstName || ''}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                fullWidth
                                                                disabled
                                                                name="last_name"
                                                                label="Last Name"
                                                                value={account.lastName || ''}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                fullWidth
                                                                name="phone_number"
                                                                label="Phonenumber"
                                                                value={account.phoneNum || ''}
                                                            />
                                                        </Grid>

                                                </Grid>
                                            </Paper>
                                        </Grid>
                                        
                                        <Grid container item xs={12}>
                                            <Grid item xs={12}>
                                                <Paper sx={{color: 'white', bgcolor: blue[700], height: 50}}>
                                                    <Box sx={{ml: 2, pt: 1.5}}>
                                                        <Typography variant="h6">Billing address</Typography>
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                            <Paper sx={{ width:1, p: 2, display: 'flex', flexDirection: 'column' }}>
                                                <Grid container item spacing={2} xs={12}>
                                                     <Grid item xs={6}  md={6}>
                                                        <TextField
                                                            fullWidth
                                                            name="first_name"
                                                            label="First Name "
                                                            value={billing.first_name}
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
                                                    <Grid item xs={12}>
                                                        <Button variant="contained" onClick={handleAddressSubmit}>Submit address</Button>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                    </Grid>        
                                </Box>
                            </Container>
                        </Box>
                    }
                </div>
            : 
                <Login/>  }
        </div>
    )
}

export default UserPage
