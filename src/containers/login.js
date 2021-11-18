import React, { Component } from 'react'

const API_PATH = 'http://suncare.localhost/api/db_connection.php';
const axios = require('axios').default;

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            message: '',
            dataSent:''
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: API_PATH,
            headers: {
                'content-type': 'application/json'
            },
            data: this.state
        }).then(result => {
            console.log(result.data)
        }).catch(error => this.setState({
            error: error.message
        }));
    }

    render() {
        return (
            <div>
                <div className="btnstyle">
                        <input type="submit"
                            value = "Send"
                            onClick={e => this.onSubmit(e)}
                            />
                </div>
            </div>
        )
    }
}

export default Login
