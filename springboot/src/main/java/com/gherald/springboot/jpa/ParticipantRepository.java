package com.gherald.springboot.jpa;

import org.springframework.data.repository.CrudRepository;

public interface ParticipantRepository extends CrudRepository<Participant, Integer> {

    Participant findParticipantById(Integer id);
}
