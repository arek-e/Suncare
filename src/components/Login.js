
import { Box } from '@mui/system';
import React from 'react'
import {useState, useEffect, useContext, useMemo} from 'react'
import {
    // eslint-disable-next-line
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import HeaderMUI from './HeaderMUI';
import { UserContext } from './UserContext';
const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/login.php'


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
            <div>
                <input type="text"
                        placeholder="Email"
                        name="email"  
                        value={form.email}
                        onChange={updateForm}
                />   
                    <input type="text"
                        placeholder="password"
                        name="password"  
                        value={form.password}
                        onChange={updateForm}
                />   
                <br/>  
                <input type="submit"
                    value="Log In"  
                    onClick={submitForm}
                />
                <br/>
                <button><Link to="/signup">Register new account</Link></button>
            </div>
        </Box>

    )
}

export default Login
