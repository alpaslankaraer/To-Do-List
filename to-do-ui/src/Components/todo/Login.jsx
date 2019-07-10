import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: 'alpaslan',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    //! We created a generic event which can handle all changes for any text element
    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    loginClicked() {
        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username,response.data.token)
                this.props.history.push(`/welcome/${this.state.username}`)
            })
            .catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })

    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container"></div>
                {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                {this.state.showSuccessMessage && <div>Login Successful</div>}
                User Name: <input type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}></input>

                Password: <input type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}></input>
                <button className="btn btn" onClick={this.loginClicked}>Login</button>
            </div>
        )
    }
}

export default Login