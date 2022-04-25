package com.gherald.springboot.controller;

import com.gherald.springboot.dto.*;
import com.gherald.springboot.model.*;
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

    @GetMapping("/api/participants/{id}")
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
        List<ChangeDto> changes = new ArrayList<>();
        for (Change change : participant.getChanges()) {
            changes.add(convertToDto(change));
        }
        List<ChangeReviewDto> changeReviews = new ArrayList<>();
        if (participant.getChangeReviews() != null) {
            for (ChangeReview changeReview : participant.getChangeReviews()) {
                changeReviews.add(convertToDto(changeReview));
            }
        }
        ParticipantDto participantDto = new ParticipantDto(participant.getId(), changes, changeReviews);
        return participantDto;
    }

    public ChangeDto convertToDto(Change change) {
        ChangeDto changeDto = new ChangeDto(change.getId(), change.getProject(), change.getBranch(), change.getSubject(), change.getStatus(), change.getCreated(), change.getUpdated(), change.getInsertions(), change.getDeletions(), change.getNumber(), change.getParent(), change.getCommitMsg(), change.getRiskLevel());
        List<FileDto> files = new ArrayList<>();
        for (File file : change.getFiles()) {
            FileDto fileDto = new FileDto(file.getFilename(), file.getStatus(), file.getInsertions(), file.getDeletions(), file.getCodeA(), file.getCodeB());
            files.add(fileDto);
        }
        changeDto.setFiles(files);
        AuthorDto authorDto = new AuthorDto(change.getAuthor().getAccountId(), change.getAuthor().getName(), change.getAuthor().getEmail(), change.getAuthor().getUsername());
        changeDto.setAuthor(authorDto);
        return changeDto;
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
