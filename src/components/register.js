import React, {useState} from 'react'
const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/register.php';

function Register() {
    const [form, setState] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        cPassword: '',
      });
    
    const [dataSent, setDataSent] = useState(false)
    
    //   const printValues = e => {
    //     e.preventDefault();
    //     console.log(form.username, form.password);
    //   };
    
      const updateField = e => {
        setState({
          ...form,
          [e.target.name]: e.target.value
        });
      };

    const submitValues = e => {
    e.preventDefault();
    console.log('Input: ',form);
    axios.post(API_PATH, form).then(result => {
        console.log('Before: ',result.data)
        setDataSent(result.data.sent)
        console.log('After: ',form)
    }).catch(error => {
        console.error('Something went wrong!', error);
    });
    };
    
    return (
        <div>{ dataSent ?
            <div>
                <p>Logging in</p>
            </div>
        :
            <div>
                <input type="text"
                    placeholder="Enter Email"
                    value={form.email}
                    name="email"
                    onChange={updateField}
                />
                <br/>
                <input type="text"
                    placeholder="Enter First Name"
                    value={form.firstName}
                    name="firstName"
                    onChange={updateField}
                />
                <input type="text"
                    placeholder="Enter Last Name"
                    value={form.lastName}
                    name="lastName"
                    onChange={updateField}
                />
                <br/>
                <input type="text"
                    placeholder="Enter Password"
                    value={form.password}
                    name="password"
                    onChange={updateField}
                />

                <input type="text"
                    placeholder="Confirm Password"
                    value={form.cPassword}
                    name="cPassword"
                    onChange={updateField}
                />
                <br/>
                <input type="submit"
                    value = "Register"
                    onClick={submitValues}
                />
            </div>
        }</div>
    );
}

export default Register
