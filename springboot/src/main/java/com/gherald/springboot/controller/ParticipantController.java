package com.gherald.springboot.controller;

import com.gherald.springboot.jpa.Participant;
import com.gherald.springboot.jpa.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ParticipantController {

    @Autowired
    private ParticipantRepository participantRepository;

    @PostMapping("/add")
    public String addParticipant(@RequestParam String email) {
        Participant participant = new Participant();
        participant.setEmail(email);
        participantRepository.save(participant);
        return "Added new participant to repo";
    }

    @GetMapping("/list")
    public Iterable<Participant> getParticipants() {
        return participantRepository.findAll();
    }

    @GetMapping("/find/{id}")
    public Participant findParticipantById(@PathVariable Integer id) {
        return participantRepository.findParticipantById(id);
    }
}
