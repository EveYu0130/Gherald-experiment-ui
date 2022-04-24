package com.gherald.springboot.service;

import com.gherald.springboot.dao.*;
import com.gherald.springboot.dto.ChangeReviewDto;
import com.gherald.springboot.dto.CodeInspectionDto;
import com.gherald.springboot.model.Change;
import com.gherald.springboot.model.ChangeReview;
import com.gherald.springboot.model.CodeInspection;
import com.gherald.springboot.model.Participant;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Service
public class ApplicationService {

    @Autowired
    ChangeRepository changeRepository;

    @Autowired
    FileRepository fileRepository;

    @Autowired
    ParticipantRepository participantRepository;

    @Autowired
    CodeInspectionRepository codeInspectionRepository;

    @Autowired
    ChangeReviewRepository changeReviewRepository;

    @Transactional
    public Participant createParticipant() {
        Participant participant = new Participant();
//        participant.setId(id);
        List<Change> changes = new ArrayList<>();
        List<Integer> riskLevelList = Arrays.asList(1, 2, 3);
        for (Integer riskLevel : riskLevelList) {
            List<Change> changesByRiskLevel = changeRepository.findAllByRiskLevel(riskLevel);
            Change randomChangeByRiskLevel = changesByRiskLevel.get(new Random().nextInt(changesByRiskLevel.size()));
            List<Participant> participants = randomChangeByRiskLevel.getParticipant();
            participants.add(participant);
            randomChangeByRiskLevel.setParticipant(participants);
            changes.add(randomChangeByRiskLevel);
        }
        participant.setChanges(changes);
        participantRepository.save(participant);
        return participant;
    }

    @Transactional
    public Participant initiateReview(String id) {
        Participant participant = participantRepository.findParticipantById(id);
        for (Change change : participant.getChanges()) {
            String changeId = change.getId();
            ChangeReview changeReview = new ChangeReview();
            changeReview.setChangeId(changeId);
            changeReview.setParticipant(participant);
            changeReviewRepository.save(changeReview);
        }
        return participant;
    }

    @Transactional
    public Participant updateRiskLevel(Integer reviewId, Integer riskLevel) {
        ChangeReview changeReview = changeReviewRepository.findChangeReviewById(reviewId);
        changeReview.setRiskLevel(riskLevel);
        changeReviewRepository.save(changeReview);
        Participant participant = changeReview.getParticipant();
        return participant;
    }

    @Transactional
    public Participant createCodeInspection(Integer reviewId, List<CodeInspectionDto> codeInspections) {
        ChangeReview changeReview = changeReviewRepository.findChangeReviewById(reviewId);
        for (CodeInspectionDto codeInspectionDto : codeInspections) {
            CodeInspection codeInspection = new CodeInspection();
            codeInspection.setFile(codeInspectionDto.getFile());
            codeInspection.setLine(codeInspectionDto.getLine());
            codeInspection.setComment(codeInspectionDto.getComment());
            codeInspection.setChangeReview(changeReview);
            codeInspectionRepository.save(codeInspection);
        }
        Participant participant = changeReview.getParticipant();
        return participant;
    }
}
