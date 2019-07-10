import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import ListTodoDataService from '../api/todo/ListTodoDataService.js'
import AuthenticationService from './AuthenticationService.js'

class CreateList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listId: this.props.match.params.listsId,
            listName: '',
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        if (this.state.listId === -1) {
            return
        }
        console.log(this.state.listId)
        let username = AuthenticationService.getLoggedInUserName()
        ListTodoDataService.retrieveTodo(username, this.state.listId, this.state.id)
            .then(response => this.setState({
                listName: response.data.listName
            })
            )

    }

    validate(values) {
        let errors = {}
        //console.log(values)
        if (!values.listName) {
            errors.listName = 'Enter a List Name'
        } else if (values.listName.length < 4) {
            errors.listName = 'Enter at least 4 characters in List Name'
        }
        return errors
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName()

        let todo = {
            listId: this.state.listId, // id is not in values so we put from this.state
            listName: values.listName,
        }

        if (this.state.listId === -1) {
            ListTodoDataService.createTodo(username, todo)
                .then(() => this.props.history.push(`/lists`))
        } else {
            ListTodoDataService.updateTodo(username, this.state.listId, todo)
                .then(() => this.props.history.push(`/lists`))
        }
        console.log(values)
    }

    render() {
        let { listName } = this.state
        console.log("render")
        return (
            <div>
                <h1>Create List</h1>
                List Component for id -  {this.props.match.params.listsId}
                <div className="container">
                    <Formik
                        initialValues={{
                            listName
                        }}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        enableReinitialize
                    >
                        {
                            (props) =>
                                <Form>
                                    <ErrorMessage name="listName" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label className="row">List Name</label>
                                        <Field className="form-control" type="text" name="listName" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                    {/* <button className="btn btn-danger" type="text">Cancel</button> */}
                                </Form>
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default CreateList