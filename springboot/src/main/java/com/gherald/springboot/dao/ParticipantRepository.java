package com.gherald.springboot.dao;

import com.gherald.springboot.model.Participant;
import org.springframework.data.repository.CrudRepository;

public interface ParticipantRepository extends CrudRepository<Participant, Integer> {

    Participant findParticipantById(String id);
}
