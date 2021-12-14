
import { Box, Grid, Paper, Typography, Avatar, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import React from 'react'
import {useState, useContext} from 'react'
import {Link} from "react-router-dom";
import { UserContext } from './UserContext';

const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/login.php'


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

function Login() {
    const {account, setAccount} = useContext(UserContext);

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [correcPwd, setCorrectPwd] = useState();

    const updateForm = event => {
        setForm({
            ...form,    //... sends the value with
            [event.target.name]: event.target.value
        });
        // console.log(form); //too see under console developement purpose
    };  

    const submitForm = event => {
        event.preventDefault();

        axios.post(API_PATH, {function: "login_user", form: form})
        .then( res => {
            setAccount(res.data.session); 
        });

    };

    return (
        <Box>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid item xs={false} sm={4} md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.pallete.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlined/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={form.email}
                            onChange={updateForm}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={form.password}
                            onChange={updateForm}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={submitForm}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    <Copyright sx={{ mt: 5 }} />
                </Box>
            </Box>
                </Grid>
            </Grid>
        </Box>

    )
}

export default Login
