import axios from 'axios'
import { JPA_API_URL } from '../../../Constants'

class TodoDataService {
    retrieveAllTodos(name, listId) {
        //console.log('executed service')
        return axios.get(`${JPA_API_URL}/users/${name}/todosListName/${listId}/todos`);
    }

    retrieveTodo(name, listId, id) {
        //console.log('executed service')
        return axios.get(`${JPA_API_URL}/users/${name}/todosListName/${listId}/todos/${id}`);
    }

    deleteTodo(name, listId, id) {
        //console.log('executed service')
        return axios.delete(`${JPA_API_URL}/users/${name}/todosListName/${listId}/todos/${id}`);
    }

    updateTodo(name, listId, id, todo) {
        //console.log('executed service')
        return axios.put(`${JPA_API_URL}/users/${name}/todosListName/${listId}/todos/${id}`, todo);
    }

    createTodo(name, listId, todo) {
        //console.log('executed service')
        return axios.post(`${JPA_API_URL}/users/${name}/todosListName/${listId}/todos/`, todo);
    }
}

export default new TodoDataService()