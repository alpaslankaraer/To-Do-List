import React, { Component } from 'react'
import TodoDataService from '../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'
import Checkbox from './Checkbox.js'


class ListTodos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos:
                [ ],
            listId: this.props.match.params.listsId,
            message: null,
            checked: false
        }

        this.refreshTodos = this.refreshTodos.bind(this)
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.refreshTodos();
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName()

        console.log(this.state.listId)
        TodoDataService.retrieveAllTodos(username, this.state.listId)
            .then(response => {
                console.log(response.data)
                this.setState({ todos: response.data })
            })
    }

    deleteTodoClicked(listId, id) {
        let username = AuthenticationService.getLoggedInUserName()
        console.log(id + " lşjfşlksdglşdjşlg " + username);

        TodoDataService.deleteTodo(username, listId, id)
            .then(response => {
                this.setState({ message: `Delete of todo ${id} Successful` })
                this.refreshTodos()
            })
    }

    updateTodoClicked(listId, id) {
        console.log('update' + listId)
        this.props.history.push(`/lists/${listId}/todos/${id}`)
    }

    addTodoClicked(listId) {
        this.props.history.push(`/lists/${listId}/todos/-1`)
    }

    handleCheckboxChange = event => {
        this.setState({ checked: event.target.checked })
    }

    render() {
        console.log('render')
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-md-6 col-sm-6">
                            <h1>List Todos</h1>
                        </div>
                        <div className="col-md-1 col-sm-1 align-self-center">
                            <button className="btn btn-success" onClick={() => this.addTodoClicked(this.state.listId)}>Add</button>
                        </div>
                    </div>
                </div>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="contianer">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Todo Name</th>
                                <th>description</th>
                                <th>Target Date</th>
                                <th>IsCompleted</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(

                                    todo => (
                                        < tr key={todo.todoId} >
                                            <td>{todo.todoName}</td>
                                            <td>{todo.description}</td>
                                            <td>{moment(todo.targetDate).format('DD.MM.YYYY')}</td>
                                            <td>
                                                <label>
                                                    <Checkbox
                                                        checked={todo.done}
                                                        onChange={this.handleCheckboxChange}
                                                    />
                                                    <span style={{ marginLeft: 8 }}>{todo.done.toString()}</span>
                                                </label>
                                            </td>
                                            <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(this.state.listId, todo.todoId)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(this.state.listId, todo.todoId)}>Delete</button></td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                    </div>
                </div>
            </div>
        )
    }
}

export default ListTodos