import React, {useState} from 'react'
const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/register.php';

function Register() {
    const [form, setState] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNum: '',
      });
    
    // const [passCheck, setPassCheck] = useState({cPassword: '',});
    
    const [dataSent, setDataSent] = useState(false);
    
      const updateField = e => {
        setState({
          ...form,
          [e.target.name]: e.target.value
        });
        // setPassCheck({
        //     ...passCheck,
        //     [e.target.name]: e.target.value
        //   });
      };

    const submitValues = e => {
    // if(form.password !== passCheck.cPassword)
    // {
    //     console.log('Not the same password')
    // };
    e.preventDefault();
    // console.log('Input: ',form);
    axios.post(API_PATH, form).then(result => {
        console.log(result.data)
        setDataSent(result.data.sent)
        console.log('Result: ',form)
    }).catch(error => {
        console.error('Something went wrong!', error);
    });
    };
    
    return (
        <div>{ dataSent ?
            <div>
                <p>New account created</p>
            </div>
        :
            <div>
                <p>Register new account</p>
                <br/>
                <input type="text"
                    placeholder="Enter Email"
                    value={form.email}
                    name="email"
                    onChange={updateField}
                />
                <br/><br/>
                <input type="text"
                    placeholder="Enter Password"
                    value={form.password}
                    name="password"
                    onChange={updateField}
                />
{/* 
                <input type="text"
                    placeholder="Confirm Password"
                    value={passCheck.cPassword}
                    name="cPassword"
                    onChange={updateField}
                /> */}
                <br/><br/>
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
                    placeholder="Enter Phone Number"
                    value={form.phoneNum}
                    name="phoneNum"
                    onChange={updateField}
                />
                <br/><br/>
                <input type="submit"
                    value = "Register"
                    onClick={submitValues}
                />
            </div>
        }</div>
    );
}

export default Register
