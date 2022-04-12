package com.gherald.springboot.repository;

import com.gherald.springboot.model.Participant;
import org.springframework.data.repository.CrudRepository;

public interface ParticipantRepository extends CrudRepository<Participant, Integer> {

    Participant findParticipantById(Integer id);
}
