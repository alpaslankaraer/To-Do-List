package com.alpaslan.rest.webservices.restfulwebservices.todo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoJpaRepository extends CrudRepository<Todo, Long> {

	public List<Todo> findByLists(Long list_Id);
}
