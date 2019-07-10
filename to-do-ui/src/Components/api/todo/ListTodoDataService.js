import axios from 'axios'
import { JPA_API_URL } from '../../../Constants'

class TodoDataService {
    retrieveAllTodos(name) {
        //console.log('executed service')
        return axios.get(`${JPA_API_URL}/users/${name}/todosListName`);
    }

    retrieveTodo(name, listId) {
        //console.log('executed service')
        return axios.get(`${JPA_API_URL}/users/${name}/todosListName/${listId}`);
    }

    deleteTodo(name, listId) {
        //console.log('executed service')
        return axios.delete(`${JPA_API_URL}/users/${name}/todosListName/${listId}`);
    }

    updateTodo(name, listId, todo) {
        //console.log('executed service')
        return axios.put(`${JPA_API_URL}/users/${name}/todosListName/${listId}`, todo);
    }

    createTodo(name, todo) {
        //console.log('executed service')
        return axios.post(`${JPA_API_URL}/users/${name}/todosListName`, todo);
    }
}

export default new TodoDataService()