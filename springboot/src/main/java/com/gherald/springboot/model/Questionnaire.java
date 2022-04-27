package com.gherald.springboot.model;

import javax.persistence.*;

@Entity
public class Questionnaire {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String understandability;

    private String difficulty;

    private String fitness;

    private String usability;

    @Column(columnDefinition = "LONGTEXT")
    private String otherTool;

    @Column(columnDefinition = "LONGTEXT")
    private String problem;

    @Column(columnDefinition = "LONGTEXT")
    private String feedback;

    private Boolean allowInterview;

    @OneToOne
    private Participant participant;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUnderstandability() {
        return understandability;
    }

    public void setUnderstandability(String understandability) {
        this.understandability = understandability;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getFitness() {
        return fitness;
    }

    public void setFitness(String fitness) {
        this.fitness = fitness;
    }

    public String getUsability() {
        return usability;
    }

    public void setUsability(String usability) {
        this.usability = usability;
    }

    public String getOtherTool() {
        return otherTool;
    }

    public void setOtherTool(String otherTool) {
        this.otherTool = otherTool;
    }

    public String getProblem() {
        return problem;
    }

    public void setProblem(String problem) {
        this.problem = problem;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public Boolean getAllowInterview() {
        return allowInterview;
    }

    public void setAllowInterview(Boolean allowInterview) {
        this.allowInterview = allowInterview;
    }

    public Participant getParticipant() {
        return participant;
    }

    public void setParticipant(Participant participant) {
        this.participant = participant;
    }
}
