import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HelloWorldService from '../api/todo/HelloWorldService.js'

class Welcome extends Component {

    constructor(props) {
        super(props);

        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)

        this.state = {
            welcomeMessage: '',
            errorMessage: ''
        }
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }
    render() {
        return (
            <>
                <h1>Welcome {this.props.match.params.name}</h1>
                <div className="container">
                    You can manage your todos <Link to="/lists">here</Link>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
                <div className="container">
                    {this.state.errorMessage}
                </div>
            </>
        )
        //! "this.props.match.params.name" daki name <Route path="/welcome/:name" deki :name ile aynı olmalı
    }

    handleSuccessfulResponse(response) {

        this.setState({ welcomeMessage: response.data.message })
    }

    handleError(error) {
        console.log(error.response);

        let errorMessage = '';
        if (error.message) {
            errorMessage += error.message
        }

        if (error.response && error.response.data) {
            errorMessage += error.response.data.message
        }

        this.setState({ errorMessage: errorMessage })
    }
}

export default Welcome