package com.gherald.springboot.dao;

import com.gherald.springboot.model.Change;
import com.gherald.springboot.model.File;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FileRepository extends CrudRepository<File, String> {

    List<File> findByChange(Change change);
    List<File> findByChangeId(String changeId);
}
