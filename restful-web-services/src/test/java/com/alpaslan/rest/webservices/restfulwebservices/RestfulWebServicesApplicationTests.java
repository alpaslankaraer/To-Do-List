package com.alpaslan.rest.webservices.restfulwebservices;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.alpaslan.rest.webservices.restfulwebservices.list.Lists;
import com.alpaslan.rest.webservices.restfulwebservices.list.ListsJpaRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class RestfulWebServicesApplicationTests {
	
	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private ListsJpaRepository listsJpaRepository;
	
	@Test
	public void testSaveTodoLists() {
		Lists list = getTodoLists();
		Lists savedInDb = entityManager.persist(list);
		Lists getFromDb = (Lists) listsJpaRepository.findByUsername(savedInDb.getUsername());
		
		assertThat(getFromDb).isEqualTo(savedInDb);
	}
	
	private Lists getTodoLists() {
		Lists list = new Lists();
		list.setListId(new Long(100L));
		list.setListName("Yarın yapılacak");
		list.setUsername("alpaslan");
		return list;
	}

}
