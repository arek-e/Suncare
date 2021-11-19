import React, { Component } from 'react'
const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/db_connection.php';


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            dataSent: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        axios({
            method: 'post',
            url: API_PATH,
            headers: {
                'content-type': 'application/json'
            },
            data: this.state
        }).then(result => {
            console.log(result.data)
            this.setState({
                dataSent: result.data.sent
            })
            console.log(this.state)
        }).catch(error => this.setState({
            error: error.message
        }));
    }

    render() {
        return (
            <div>{ this.state.dataSent ?
                <div>
                    <p>Logging in</p>
                </div>
            :
                <div className="btnstyle">
                    <input type="text"
                        placeholder="Enter Username"
                        value={this.state.username}
                        onChange={e => this.setState({ username: e.target.value })}
                    />
                    <input type="text"
                        placeholder="Enter password"
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                    <input type="submit"
                        value = "Send"
                        onClick={e => this.onSubmit(e)}
                    />
                </div>
            }</div>
        )
    }
}

export default Login
