package com.alpaslan.rest.webservices.restfulwebservices.todo;

import java.util.Date;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.alpaslan.rest.webservices.restfulwebservices.list.Lists;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Todo {

	@Id
	@Column(name = "todo_id")
	@GeneratedValue
	private Long todoId;

	private String todoName;
	private String description;
	private Date targetDate;
	private boolean isDone;

	@ManyToOne
	@JoinColumn(name = "LIST_ID")
	@JsonIgnore
	private Lists lists;

	protected Todo() {

	}

	public Todo(Long todoId, String todoName, String description, Date targetDate, boolean isDone, Long lists) {
		super();
		this.todoId = todoId;
		this.todoName = todoName;
		this.description = description;
		this.targetDate = targetDate;
		this.isDone = isDone;
		this.lists.setListId(lists);
	}

	public Long getTodoId() {
		return todoId;
	}

	public void setTodoId(Long todoId) {
		this.todoId = todoId;
	}

	public String getTodoName() {
		return todoName;
	}

	public void setTodoName(String todoName) {
		this.todoName = todoName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getTargetDate() {
		return targetDate;
	}

	public void setTargetDate(Date targetDate) {
		this.targetDate = targetDate;
	}

	public boolean isDone() {
		return isDone;
	}

	public void setDone(boolean isDone) {
		this.isDone = isDone;
	}

	public Lists getLists() {
		return lists;
	}

	public void setLists(Lists lists) {
		this.lists = lists;
	}

	@Override
	public int hashCode() {
		return Objects.hash(description, isDone, targetDate, todoId, todoName);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Todo other = (Todo) obj;
		return Objects.equals(description, other.description) && isDone == other.isDone
				&& Objects.equals(targetDate, other.targetDate) && Objects.equals(todoId, other.todoId)
				&& Objects.equals(todoName, other.todoName);
	}

}
