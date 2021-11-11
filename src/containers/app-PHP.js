import React, {
    Component
} from 'react'
import './app.css';
import axios from 'axios'

const API_PATH = 'http://suncare.localhost/api/feedback_ac.php';


class App extends Component {
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
        console.log(this.state);
        axios({
            method: 'post',
            url: API_PATH,
            headers: {
                'content-type': 'application/json'
            },
            data: this.state
        })
        .then(result => {
            console.log(result.data)
            this.setState({
                dataSent: result.data.sent,
            })
            console.log(this.state)
        })
        .catch(error => this.setState({
            error: error.message
        }));
    }

    render() {
        return (
        <div className=" box feedback-form">
        {this.state.dataSent ?
            <p className="msg"> SUCCESS<br/><br/>
                Thanks for submitting your feedback.<br/>
                We appreciate your time.
            </p>
        :
            <div className="container">
                <div className="box heading">
                    <h1>EAT, DINE & <br/>DRINK</h1>
                </div>
                <div className=" box feedback-form">
                    <p className="grey">SEND US YOUR FEEDBACK</p>
                    <div className="inputstyle">
                        <input type="text"
                            placeholder="Enter your Name"
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })}
                            />
                    </div>
                    <div className="inputstyle">
                        <input type="text"
                            placeholder="Enter your Email"
                            value={this.state.email}
                            onChange={e => this.setState({ email: e.target.value })}
                            />
                    </div>
                    <div className="inputstyle">
                        <textarea placeholder="Your message goes here"
                            value={this.state.feedback}
                            onChange={e => this.setState({ feedback: e.target.value })}
                        ></textarea>
                    </div>
                    <div className="btnstyle">
                        <input type="submit"
                            value = "Send"
                            onClick={e => this.onSubmit(e)}
                            />
                    </div>
                </div>
            </div>
        }</div>
        )
        
    }
}
export default App;