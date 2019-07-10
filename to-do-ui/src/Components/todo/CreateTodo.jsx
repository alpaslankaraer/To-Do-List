import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import TodoDataService from '../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'

class CreateTodo extends Component {
    constructor(props) {
        super(props)
        //console.log(props)
        this.state = {
            id: this.props.match.params.id,
            todoName: '',
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD'),
            listId: this.props.match.params.listsId
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        if (this.state.id === -1) {
            return
        }
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveTodo(username, this.state.listId, this.state.id)
            .then(response => this.setState({
                todoName: response.data.todoName,
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            }))

    }

    validate(values) {
        let errors = {}
        //console.log(values)
        if (!values.description) {
            errors.description = 'Enter a Desription'
        } else if (values.description.length < 4) {
            errors.description = 'Enter at least 4 characters in Description'
        }
        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }
        return errors
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName()

        let todo = {
            id: this.state.id, // id is not in values so we put from this.state
            todoName: values.todoName,
            description: values.description,
            targetDate: values.targetDate
        }

        if (this.state.id === "-1") {
            TodoDataService.createTodo(username, this.state.listId, todo)
                .then(() => this.props.history.push(`/lists/${this.state.listId}/todos`))
        } else {
            TodoDataService.updateTodo(username, this.state.listId, this.state.id, todo)
                .then(() => this.props.history.push(`/lists/${this.state.listId}/todos/${this.state.id}`))
        }
        console.log(values)
    }

    render() {
        let { description, targetDate, todoName } = this.state
        // let description = this.state.description
        // let targetDate = this.state.targetDate
        console.log("render")
        return (
            <div>
                <h1>Create Todo</h1>
                Todo Component for id -  {this.props.match.params.id}
                <div className="container">
                    <Formik
                        initialValues={{
                            todoName,
                            description,
                            targetDate
                        }}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        enableReinitialize
                    >
                        {
                            (props) =>
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label className="row">Name</label>
                                        <Field className="form-control" type="text" name="todoName" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label className="row">Description</label>
                                        <Field className="form-control" type="text" name="description" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label className="row">Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                    <button className="btn btn-danger" type="text">Cancel</button>
                                </Form>
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default CreateTodo