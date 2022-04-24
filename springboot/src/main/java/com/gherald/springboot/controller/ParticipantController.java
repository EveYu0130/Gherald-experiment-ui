package com.gherald.springboot.controller;

import com.gherald.springboot.dao.ChangeRepository;
import com.gherald.springboot.dto.ChangeReviewDto;
import com.gherald.springboot.dto.CodeInspectionDto;
import com.gherald.springboot.dto.ParticipantDto;
import com.gherald.springboot.model.Change;
import com.gherald.springboot.model.ChangeReview;
import com.gherald.springboot.model.CodeInspection;
import com.gherald.springboot.model.Participant;
import com.gherald.springboot.dao.ParticipantRepository;
import com.gherald.springboot.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ParticipantController {

    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/api/participants/add")
    public ParticipantDto createParticipant() {
        Participant participant = applicationService.createParticipant();
        return convertToDto(participant);
    }

    @PostMapping("/api/participants/{id}")
    public ParticipantDto initiateReview(@PathVariable String id) {
        Participant participant = applicationService.initiateReview(id);
        return convertToDto(participant);
    }

    @GetMapping("/api/participants")
    public List<ParticipantDto> getParticipants() {
        List<ParticipantDto> participants = new ArrayList<>();
        for (Participant participant : participantRepository.findAll()) {
            participants.add(convertToDto(participant));
        }
        return participants;
    }

    @GetMapping("/api/participants/find/{id}")
    public ParticipantDto findParticipantById(@PathVariable String id) {
        return convertToDto(participantRepository.findParticipantById(id));
    }

    @PostMapping("/api/risk-assessment")
    public ParticipantDto updateRiskLevel(@RequestParam Integer reviewId, @RequestParam Integer riskLevel) {
        Participant participant = applicationService.updateRiskLevel(reviewId, riskLevel);
        return convertToDto(participant);
    }

    @PostMapping("/api/code-review")
    public ParticipantDto createCodeInspection(@RequestBody ChangeReviewDto changeReview) {
        Participant participant = applicationService.createCodeInspection(changeReview.getId(), changeReview.getCodeInspections());
        return convertToDto(participant);
    }

    private ParticipantDto convertToDto(Participant participant)  {
        List<String> changeIds = new ArrayList<>();
        for (Change change : participant.getChanges()) {
            changeIds.add(change.getId());
        }
        List<ChangeReviewDto> changeReviews = new ArrayList<>();
        if (participant.getChangeReviews() != null) {
            for (ChangeReview changeReview : participant.getChangeReviews()) {
                changeReviews.add(convertToDto(changeReview));
            }
        }
        ParticipantDto participantDto = new ParticipantDto(participant.getId(), changeIds, changeReviews);
        return participantDto;
    }

    private ChangeReviewDto convertToDto(ChangeReview changeReview) {
        Integer riskLevel = (changeReview.getRiskLevel() == null) ? 0 : changeReview.getRiskLevel();
        List<CodeInspectionDto> codeInspections = new ArrayList<>();
        if (changeReview.getCodeInspections() != null) {
            for (CodeInspection codeInspection : changeReview.getCodeInspections()) {
                codeInspections.add(convertToDto(codeInspection));
            }
        }
        ChangeReviewDto changeReviewDto = new ChangeReviewDto(changeReview.getId(), changeReview.getChangeId(), riskLevel, codeInspections);
        return changeReviewDto;
    }

    private CodeInspectionDto convertToDto(CodeInspection codeInspection) {
        CodeInspectionDto codeInspectionDto = new CodeInspectionDto(codeInspection.getFile(), codeInspection.getLine(), codeInspection.getComment());
        return codeInspectionDto;
    }
}
