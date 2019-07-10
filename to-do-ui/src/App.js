import React, { Component } from 'react';
import './App.css';
//import Counter from './Components/counter/Counter'
import TodoApp from './Components/todo/TodoApp'
import './bootstrap.css'

class App extends Component {
    render() {
        return (
            <div className="App">
                <TodoApp />
            </div>
        );
    }
}

export default App;
