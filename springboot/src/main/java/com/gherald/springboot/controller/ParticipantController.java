package com.gherald.springboot.controller;

import com.gherald.springboot.model.Participant;
import com.gherald.springboot.repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ParticipantController {

    @Autowired
    private ParticipantRepository participantRepository;

    @PostMapping("/api/participants/add")
    public String addParticipant(@RequestParam String email) {
        Participant participant = new Participant();
        participant.setEmail(email);
        participantRepository.save(participant);
        return "Added new participant to repo";
    }

    @GetMapping("/api/participants")
    public Iterable<Participant> getParticipants() {
        return participantRepository.findAll();
    }

    @GetMapping("/api/participants/find/{id}")
    public Participant findParticipantById(@PathVariable Integer id) {
        return participantRepository.findParticipantById(id);
    }
}
