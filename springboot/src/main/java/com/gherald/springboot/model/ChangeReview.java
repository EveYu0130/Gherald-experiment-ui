package com.gherald.springboot.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="change_review")
public class ChangeReview {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String changeId;

    @ManyToOne
    private Participant participant;

    private Integer riskLevel;

    @OneToMany(mappedBy = "changeReview", cascade = CascadeType.ALL)
    private List<CodeInspection> codeInspections;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getChangeId() {
        return changeId;
    }

    public void setChangeId(String changeId) {
        this.changeId = changeId;
    }

    public Participant getParticipant() {
        return participant;
    }

    public void setParticipant(Participant participant) {
        this.participant = participant;
    }

    public Integer getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(Integer riskLevel) {
        this.riskLevel = riskLevel;
    }

    public List<CodeInspection> getCodeInspections() {
        return codeInspections;
    }

    public void setCodeInspections(List<CodeInspection> codeInspections) {
        this.codeInspections = codeInspections;
    }
}
