import React from 'react'
import {useState} from 'react'
const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/signup.php'

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
        // console.log(form); //too see under console developement purpose
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
            <div>
                <input type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={form.firstName}
                    onChange={updateForm} //update realtime, when changing in input 
                />
                <br/>
                <input type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={form.lastName}
                    onChange={updateForm}
                />
                <br/>
                <input type="text"
                    placeholder="Email"
                    name="email"
                    value={form.email}
                    onChange={updateForm}
                />
                <br/>
                <input type="text"
                    placeholder="Phonenumber"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={updateForm}
                />
                <br/>
                <input type="text"
                    placeholder="Password"
                    name="password"
                    value={form.password}
                    onChange={updateForm}
                />
                <br/>
                <input type="text"
                    placeholder="Repeat Password"
                    name="checkPwd"
                />
                <br/>
                <br/>
                <input type="submit"
                    value="Register"
                    onClick={submitForm}
                />
            </div>
        }</div>
    )
}

export default SignUp
