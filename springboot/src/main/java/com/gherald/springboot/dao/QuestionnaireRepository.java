package com.gherald.springboot.dao;

import com.gherald.springboot.model.Questionnaire;
import org.springframework.data.repository.CrudRepository;

public interface QuestionnaireRepository extends CrudRepository<Questionnaire, String> {

    Questionnaire findQuestionnaireByParticipantId(String id);
}
