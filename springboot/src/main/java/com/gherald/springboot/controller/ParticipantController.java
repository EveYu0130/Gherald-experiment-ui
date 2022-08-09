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
    public ParticipantDto createParticipant(@RequestParam String tool, @RequestParam String project) {
        Participant participant = applicationService.createParticipant(tool, project);
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

//    @PostMapping("/api/risk-assessment")
//    public ParticipantDto updateRiskLevel(@RequestParam Integer reviewId, @RequestParam Integer riskLevel) {
//        Participant participant = applicationService.updateRiskLevel(reviewId, riskLevel);
//        return convertToDto(participant);
//    }

    @PostMapping("/api/risk-assessment")
    public void updateRiskLevel(@RequestBody List<ChangeReviewDto> changeReviews) {
        applicationService.updateRiskLevel(changeReviews);
    }

    @PostMapping("/api/code-review")
    public ChangeReviewDto createCodeInspection(@RequestBody ChangeReviewDto changeReviewDto) {
        ChangeReview changeReview = applicationService.createCodeInspection(changeReviewDto.getId(), changeReviewDto.getCodeInspections());
        return convertToDto(changeReview);
    }

    @PostMapping("/api/questionnaire")
    public void createQuestionnaire(@RequestBody QuestionnaireDto questionnaireDto) {
        applicationService.createQuestionnaire(questionnaireDto);
    }

    private ParticipantDto convertToDto(Participant participant)  {
        List<ChangeReviewDto> changeReviews = new ArrayList<>();
        if (participant.getChangeReviews() != null) {
            for (ChangeReview changeReview : participant.getChangeReviews()) {
                changeReviews.add(convertToDto(changeReview));
            }
        }
        ParticipantDto participantDto = new ParticipantDto(participant.getId(), participant.getTool(), participant.getProject(), changeReviews);
        return participantDto;
    }

    public ChangeDto convertToDto(Change change) {
        if (change == null) {
            return null;
        }
        ChangeDto changeDto = new ChangeDto(change.getId(), change.getRepo(), change.getBranch(), change.getSubject(), change.getCreated(), change.getUpdated(), change.getInsertions(), change.getDeletions(), change.getNumber(), change.getParent(), change.getCommitMsg(), change.getRiskLevel(), change.getProject());
        List<FileDto> files = new ArrayList<>();
        for (File file : change.getFiles()) {
            FileDto fileDto = new FileDto(file.getFilename(), file.getStatus(), file.getInsertions(), file.getDeletions(), file.getCodeA(), file.getCodeB(), file.getDiff());
            files.add(fileDto);
        }
        changeDto.setFiles(files);
        AuthorDto authorDto = new AuthorDto(change.getAuthor().getAccountId(), change.getAuthor().getName(), change.getAuthor().getEmail(), change.getAuthor().getUsername(), change.getAuthor().getProject());
        changeDto.setAuthor(authorDto);
        return changeDto;
    }

    private ChangeReviewDto convertToDto(ChangeReview changeReview) {
        Integer riskLevel = (changeReview.getRiskLevel() == null) ? null : changeReview.getRiskLevel();
        ChangeDto change = convertToDto(changeReview.getChange());
        List<CodeInspectionDto> codeInspections = new ArrayList<>();
        if (changeReview.getCodeInspections() != null) {
            for (CodeInspection codeInspection : changeReview.getCodeInspections()) {
                codeInspections.add(convertToDto(codeInspection));
            }
        }
        ChangeReviewDto changeReviewDto = new ChangeReviewDto(changeReview.getId(), change, riskLevel, codeInspections);
        return changeReviewDto;
    }

    private CodeInspectionDto convertToDto(CodeInspection codeInspection) {
        CodeInspectionDto codeInspectionDto = new CodeInspectionDto(codeInspection.getFile(), codeInspection.getLine(), codeInspection.getComment());
        return codeInspectionDto;
    }
}
