package com.alpaslan.rest.webservices.restfulwebservices.list;

import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.alpaslan.rest.webservices.restfulwebservices.todo.Todo;

@Entity
public class Lists {

	@Id
	@GeneratedValue
	@Column(name = "list_id")
	private Long listId;

	private String username;
	private String listName;

	@OneToMany(targetEntity = Todo.class, mappedBy = "lists", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<Todo> todo;

	public Lists() {

	}

	public Lists(Long listId, String username, String listName) {
		super();
		this.listId = listId;
		this.username = username;
		this.listName = listName;
	}

	public Long getListId() {
		return listId;
	}

	public void setListId(Long listId) {
		this.listId = listId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getListName() {
		return listName;
	}

	public void setListName(String listName) {
		this.listName = listName;
	}

	public Set<Todo> getTodo() {
		return todo;
	}

	public void setTodo(Set<Todo> todo) {
		this.todo = todo;
	}

	@Override
	public int hashCode() {
		return Objects.hash(listId, listName, todo, username);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Lists other = (Lists) obj;
		return Objects.equals(listId, other.listId) && Objects.equals(listName, other.listName)
				&& Objects.equals(todo, other.todo) && Objects.equals(username, other.username);
	}

	public void addTodo(Todo todo) {
		todo.setLists(this);
		this.todo.add(todo);
	}

}
