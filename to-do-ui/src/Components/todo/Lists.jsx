import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'
import './All.css'
import ListTodoDataService from '../api/todo/ListTodoDataService.js';
import { withRouter } from 'react-router-dom'


class Lists extends Component {
    constructor(props) {
        //console.log('constructor')
        super(props)
        this.state = {
            todolists:
                [ ],
            message: null
        }

        this.refreshListTodos = this.refreshListTodos.bind(this)
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
    }


    componentDidMount() {
        this.refreshListTodos();
    }

    refreshListTodos() {
        let username = AuthenticationService.getLoggedInUserName()

        ListTodoDataService.retrieveAllTodos(username)
            .then(response => {
                console.log(response.data)
                this.setState({ todolists: response.data })
            })
    }

    deleteTodoClicked(listId) {
        let username = AuthenticationService.getLoggedInUserName()

        ListTodoDataService.deleteTodo(username, listId)
            .then(response => {
                this.setState({ message: `Delete of list id: ${listId} Successful` })
                this.refreshListTodos()
            })
    }

    updateTodoClicked(id) {
        console.log('update' + id)
        this.props.history.push(`/lists/${id}`)
    }

    addTodoClicked() {
        this.props.history.push(`/lists/-1`)
    }

    goTodoClicked(id) {
        this.props.history.push(`/lists/${id}/todos`)
    }

    render() {
        //console.log('render')
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-md-6 col-sm-6">
                            <h1>Todos List</h1>
                        </div>
                        <div className="col-md-1 col-sm-1 align-self-center">
                            <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                        </div>
                    </div>
                </div>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="contianer">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>List Name</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todolists.map(
                                    todo => (
                                        <tr key={todo.listId}>
                                            <td>
                                                <div className="pointer" onClick={() => { this.goTodoClicked(todo.listId) }}>
                                                       {todo.listName}
                                                </div>
                                            </td>
                                            <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.listId)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.listId)}>Delete</button></td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default withRouter(Lists)