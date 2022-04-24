package com.gherald.springboot.dao;

import com.gherald.springboot.model.CodeInspection;
import org.springframework.data.repository.CrudRepository;

public interface CodeInspectionRepository extends CrudRepository<CodeInspection, String> {
}