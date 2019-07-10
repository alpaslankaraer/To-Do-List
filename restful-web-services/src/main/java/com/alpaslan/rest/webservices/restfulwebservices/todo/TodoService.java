package com.alpaslan.rest.webservices.restfulwebservices.todo;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoService {

	@Autowired
	private TodoJpaRepository todoJpaRepository;

	public List<Todo> getAllTodos() {

		List<Todo> todos = new ArrayList<>();

		todoJpaRepository.findAll().forEach(todos::add);

		return todos;
	}

	public Todo addTodo(Todo todo) {
		return todoJpaRepository.save(todo);
	}

	public Optional<Todo> getTodo(Long todoId) {
		return todoJpaRepository.findById(todoId);
	}

	public void deleteTodo(Long todoId) {
		todoJpaRepository.deleteById(todoId);
	}

	public void updateTodo(Long todoId, Todo todo) {
		todoJpaRepository.save(todo);
	}

	public List<Todo> getTodosByLists(Long list_Id) {
		List<Todo> todos = new ArrayList<>();

		todoJpaRepository.findByLists(list_Id).forEach(todos::add);

		return todos;
	}

}
