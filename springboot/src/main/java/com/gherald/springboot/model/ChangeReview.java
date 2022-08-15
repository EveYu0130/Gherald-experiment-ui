package com.gherald.springboot.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="change_review")
public class ChangeReview {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    private Change change;

    @ManyToOne
    private Participant participant;

    private Integer riskLevel;

    private Integer reviewTime;

    @OneToMany(mappedBy = "changeReview", cascade = CascadeType.ALL)
    private List<CodeInspection> codeInspections;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Change getChange() {
        return change;
    }

    public void setChange(Change change) {
        this.change = change;
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

    public Integer getReviewTime() {
        return reviewTime;
    }

    public void setReviewTime(Integer reviewTime) {
        this.reviewTime = reviewTime;
    }

    public List<CodeInspection> getCodeInspections() {
        return codeInspections;
    }

    public void setCodeInspections(List<CodeInspection> codeInspections) {
        this.codeInspections = codeInspections;
    }
}
