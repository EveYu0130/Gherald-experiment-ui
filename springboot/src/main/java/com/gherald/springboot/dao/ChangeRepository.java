package com.gherald.springboot.dao;

import com.gherald.springboot.model.Change;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ChangeRepository extends CrudRepository<Change, String> {

    Change findChangeById(String id);
    List<Change> findAllByProject(String project);

}
