import React from 'react'
import {useState} from 'react'
import {
    // eslint-disable-next-line
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/login.php'

function Login() {
    
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [dataSent, setDataSent] = useState(false);

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

        axios.post(API_PATH, form).then(result => {
            setDataSent(result.data.same);
            // setCorrectPwd(result.data.same);
            // if(!correcPwd){
            //     console.log("Incorrect password!");
            // }
            // else{
            //     console.log("correct password!")
            // }
        })
    };


    return (
        <div>{ dataSent ?
            <div>
                <p>Congrats you are now logged in!</p>
            </div>
        :
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
     }</div>
    )
}

export default Login
