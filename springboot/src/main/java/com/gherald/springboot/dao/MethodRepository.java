package com.gherald.springboot.dao;

import com.gherald.springboot.model.Method;
import org.springframework.data.repository.CrudRepository;


public interface MethodRepository extends CrudRepository<Method, String> {
}
