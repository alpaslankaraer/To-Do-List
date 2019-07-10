import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'

class Header extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="localhost:3000/login" className="navbar-brand">Project</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/alpaslan">Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/lists">Todos Lists</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

//! sadece Header yazarak export edince react-router-dom v5.0.0 ve üstünde navbar'ı değiştirmiyor.
//! Ancak withRouter(Header) yazarak değişmesini sağlıyoruz.
export default withRouter(Header)