package com.alpaslan.rest.webservices.restfulwebservices.list;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alpaslan.rest.webservices.restfulwebservices.todo.Todo;

@Service
public class ListsService {

	@Autowired
	private ListsJpaRepository listsJpaRepository;

	public List<Lists> getAllLists() {
		List<Lists> lists = new ArrayList<>();

		listsJpaRepository.findAll().forEach(lists::add);

		return lists;
	}

	public Lists retrieveList(Long listId) {
		for (Lists list : listsJpaRepository.findAll()) {
			if (list.getListId().equals(listId)) {
				return list;
			}
		}
		return null;
	}

	public Set<Todo> retrieveTodos(Long listId) {
		Lists list = retrieveList(listId);

		if (list == null) {
			return null;
		}

		return list.getTodo();
	}

	public Optional<Lists> getList(Long listId) {
		return listsJpaRepository.findById(listId);
	}

	public Lists addList(Lists lists) {
		return listsJpaRepository.save(lists);
	}

	public Lists updateList(Long listId, Lists lists) {
		return listsJpaRepository.save(lists);
	}

	public void deleteList(Long listId) {
		listsJpaRepository.deleteById(listId);
	}

	public List<Lists> getListsByUsername(String username) {
		List<Lists> lists = new ArrayList<>();

		listsJpaRepository.findByUsername(username).forEach(lists::add);

		return lists;
	}
}
