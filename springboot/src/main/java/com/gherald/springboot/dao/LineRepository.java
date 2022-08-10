package com.gherald.springboot.dao;

import com.gherald.springboot.model.Line;
import org.springframework.data.repository.CrudRepository;


public interface LineRepository extends CrudRepository<Line, String> {
}
