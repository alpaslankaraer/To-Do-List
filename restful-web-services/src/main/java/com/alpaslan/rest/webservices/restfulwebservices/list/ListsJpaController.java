package com.alpaslan.rest.webservices.restfulwebservices.list;

import java.net.URI;
import java.util.List;

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

@RestController
@CrossOrigin(origins = "http://localhost:3005")

public class ListsJpaController {

	@Autowired
	private ListsService listsService;

	// GET /users/{username}/todos/
	@GetMapping("/jpa/users/{username}/todosListName")
	public List<Lists> getAllTodosLists(@PathVariable String username) {

		return listsService.getListsByUsername(username);
	}

	// GET /users/{username}/todos/{id}
	@GetMapping("/jpa/users/{username}/todosListName/{listId}")
	public Lists getTodoLists(@PathVariable String username, @PathVariable long listId) {

		return listsService.getList(listId).get();
	}

	// DELETE /users/{username}/todos/{id}
	@DeleteMapping("/jpa/users/{username}/todosListName/{listId}")
	public ResponseEntity<Void> deleteTodoLists(@PathVariable String username, @PathVariable long listId) {

		/*
		 * return todoListsJpaRepository.findById(id).map(todo -> {
		 * todoListsJpaRepository.delete(todo); return "Delete successfully!";
		 * }).orElseThrow(() -> new NotFoundException("Student not found with id " +
		 * id));
		 */

		listsService.deleteList(listId);

		return ResponseEntity.noContent().build();
	}

	// PUT /users/{username}/todos/{id}
	@PutMapping("/jpa/users/{username}/todosListName/{listId}")
	public ResponseEntity<Lists> updateTodoLists(@PathVariable String username, @PathVariable long listId,
			@RequestBody Lists todolists) {

		/*
		 * return todoListsJpaRepository.findById(id) .map(todo -> {
		 * todo.setName(todolists.getName()); todo.setAge(todolists.getAge()); return
		 * todoListsJpaRepository.save(todo); }).orElseThrow(() -> new
		 * NotFoundException("Student not found with id " + id));
		 */

		todolists.setUsername(username);

		todolists.setListId(listId);

		Lists createdTodoLists = listsService.updateList(listId, todolists);

		return new ResponseEntity<Lists>(createdTodoLists, HttpStatus.OK);
	}

	// POST /users/{username}/todos
	@PostMapping("/jpa/users/{username}/todosListName")
	public ResponseEntity<Void> createTodoLists(@PathVariable String username, @RequestBody Lists todolists) {

		todolists.setUsername(username);

		Lists createdTodoLists = listsService.addList(todolists);

		// Location
		// Get Current Resource URL
		// {id}
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(createdTodoLists.getListId()).toUri();

		return ResponseEntity.created(uri).build();
	}

}
