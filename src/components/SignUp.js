
import React from 'react'
import {useState} from 'react'
import { Link } from "react-router-dom";
import { LockOutlined } from '@mui/icons-material';
import { Box, Avatar, Container, Grid, TextField, Typography, Button } from '@mui/material';

const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/signup.php'

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" to="/">
          Suncare
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

function SignUp() {
    //Stores the signUp data
    const [form, setForm] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',   
    });

    const [dataSent, setDataSent] = useState(false);

    const updateForm = event => {
        setForm({
            ...form,    //... sends the value with
            [event.target.name]: event.target.value
        });
        //console.log(form); //too see under console developement purpose
    };  

    const submitForm = event => {
        event.preventDefault();

        axios.post(API_PATH, form).then(result => {
            setDataSent(result.data.sent)
        })
    };
    
    return (
        <div>{ dataSent ?
            <div>
                <p>Congrats you are now registered!</p>
            </div>
        :
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        mt: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> 
                        <LockOutlined/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box noValidate sx={{ mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={form.firstName}
                                    onChange={updateForm}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={form.lastName}
                                    onChange={updateForm}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Adress"
                                    name="email"
                                    autoComplete="email"
                                    value={form.email}
                                    onChange={updateForm}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phoneNum"
                                    label="Phonenumber"
                                    name="phoneNumber"
                                    autoComplete="phonenumber"
                                    value={form.phoneNumber}
                                    onChange={updateForm}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    value={form.password}
                                    onChange={updateForm}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={submitForm}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid>
                                <Link to="/user">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        }</div>
    )
}

export default SignUp
