import React, { Component } from 'react'
import Register from '../components/Register';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

class UserPage extends Component {
    render() {
        return (
            <div>
                {/* <Register/> */}
                <SignUp/>
                {/* <Login/> */}
            </div>
        )
    }
}

export default UserPage
