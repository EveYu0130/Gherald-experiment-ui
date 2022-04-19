package com.gherald.springboot.dao;

import com.gherald.springboot.model.Change;
import org.springframework.data.repository.CrudRepository;

public interface ChangeRepository extends CrudRepository<Change, String> {

    Change findChangeById(String id);
}
