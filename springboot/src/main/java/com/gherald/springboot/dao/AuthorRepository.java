package com.gherald.springboot.dao;

import com.gherald.springboot.model.Author;
import org.springframework.data.repository.CrudRepository;

public interface AuthorRepository extends CrudRepository<Author, String> {
}
