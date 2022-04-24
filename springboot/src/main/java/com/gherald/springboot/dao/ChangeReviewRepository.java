package com.gherald.springboot.dao;

import com.gherald.springboot.model.ChangeReview;
import org.springframework.data.repository.CrudRepository;

public interface ChangeReviewRepository extends CrudRepository<ChangeReview, String> {

    ChangeReview findChangeReviewById(Integer id);
}
