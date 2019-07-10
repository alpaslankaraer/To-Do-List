package com.alpaslan.rest.webservices.restfulwebservices.list;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListsJpaRepository extends JpaRepository<Lists, Long> {

	public List<Lists> findByUsername(String username);

}
