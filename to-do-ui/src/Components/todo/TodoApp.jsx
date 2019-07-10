import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Login.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Logout from './Logout.jsx'
import Welcome from './Welcome.jsx'
import ErrorPage from './Error.jsx'
import CreateTodo from './CreateTodo.jsx'
import Lists from './Lists.jsx'
import ListTodos from './ListTodos.jsx';
import CreateList from './CreateList.jsx';

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <>
                        <Header />
                        <Switch>
                            <Route path="/" exact component={Login} />
                            <Route path="/login" component={Login} />
                            <Route path="/welcome/:name" component={Welcome} />
                            <Route path="/lists/:listsId/todos/:id" component={CreateTodo} />
                            <Route path="/lists/:listsId/todos" component={ListTodos} />
                            <Route path="/lists/:listsId" component={CreateList} />
                            <Route path="/lists" component={Lists} />
                            <Route path="/logout" component={Logout} />
                            <Route component={ErrorPage} />
                        </Switch>
                        <Footer />
                    </>
                </Router>
                {/* <Login />
                <Welcome /> */}
            </div>
        )
    }
}

export default TodoApp;