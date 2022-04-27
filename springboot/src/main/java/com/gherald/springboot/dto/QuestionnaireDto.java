package com.gherald.springboot.dto;

public class QuestionnaireDto {
    private String understandability;
    private String difficulty;
    private String fitness;
    private String usability;
    private String otherTool;
    private String problem;
    private String feedback;
    private Boolean allowInterview;
    private String participantId;

    public QuestionnaireDto(String understandability, String difficulty, String fitness, String usability, String otherTool, String problem, String feedback, Boolean allowInterview, String participantId) {
        this.understandability = understandability;
        this.difficulty = difficulty;
        this.fitness = fitness;
        this.usability = usability;
        this.otherTool = otherTool;
        this.problem = problem;
        this.feedback = feedback;
        this.allowInterview = allowInterview;
        this.participantId = participantId;
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

    public String getParticipantId() {
        return participantId;
    }

    public void setParticipantId(String participantId) {
        this.participantId = participantId;
    }
}
