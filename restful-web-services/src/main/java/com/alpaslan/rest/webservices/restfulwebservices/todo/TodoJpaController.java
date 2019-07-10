package com.alpaslan.rest.webservices.restfulwebservices.todo;

import java.net.URI;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.alpaslan.rest.webservices.restfulwebservices.list.ListsService;
import com.alpaslan.rest.webservices.restfulwebservices.todo.Todo;

@RestController
@CrossOrigin(origins = "http://localhost:3005")

public class TodoJpaController {

	@Autowired
	private TodoService todoService;

	@Autowired
	private ListsService listsService;

	// GET /users/{username}/todosListName/{listId}/todos
	@GetMapping("/jpa/users/{username}/todosListName/{listId}/todos")
	public Set<Todo> getAllTodos(@PathVariable Long listId) {

		return listsService.retrieveTodos(listId);
	}

	// GET /users/{username}/todosListName/{listId}/todos/{id}
	@GetMapping("/jpa/users/{username}/todosListName/{listId}/todos/{id}")
	public Todo getTodo(@PathVariable String username, @PathVariable long id) {

		return todoService.getTodo(id).get();
	}

	// DELETE /users/{username}/todosListName/{listId}/todos/{id}
	@DeleteMapping("/jpa/users/{username}/todosListName/{listId}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id) {

		todoService.deleteTodo(id);

		return ResponseEntity.noContent().build();
	}

	// PUT /users/{username}/todosListName/{listId}/todos/{id}
	@PutMapping("/jpa/users/{username}/todosListName/{listId}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String username, @PathVariable long listId,
			@PathVariable long id, @RequestBody Todo todo) {

		// todo.setUsername(username);
		// todo.setLists(new Lists(listId, username, ""));
		// todo = todoService.getTodo(id).get();

		todoService.updateTodo(id, todo);

		return new ResponseEntity<Todo>(todo, HttpStatus.OK);
	}

	// POST /users/{username}/todosListName/{listId}/todos
	@PostMapping("/jpa/users/{username}/todosListName/{listId}/todos")
	public ResponseEntity<Void> createTodo(@PathVariable String username, @PathVariable long listId,
			@RequestBody Todo todo) {

		todo.getLists().setListId(listId);

		Todo createdTodo = todoService.addTodo(todo);

		// Location
		// Get Current Resource URL
		// {id}
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{listId}")
				.buildAndExpand(createdTodo.getTodoId()).toUri();

		return ResponseEntity.created(uri).build();
	}

}
