package com.gherald.springboot.dto;

import com.gherald.springboot.model.CodeInspection;
import com.gherald.springboot.model.Participant;

import java.util.List;

public class ChangeReviewDto {
    private Integer id;
    private String changeId;
    private Integer riskLevel;
    private List<CodeInspectionDto> codeInspections;

    public ChangeReviewDto(Integer id, String changeId, Integer riskLevel, List<CodeInspectionDto> codeInspections) {
        this.id = id;
        this.changeId = changeId;
        this.riskLevel = riskLevel;
        this.codeInspections = codeInspections;
    }

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

    public Integer getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(Integer riskLevel) {
        this.riskLevel = riskLevel;
    }

    public List<CodeInspectionDto> getCodeInspections() {
        return codeInspections;
    }

    public void setCodeInspections(List<CodeInspectionDto> codeInspections) {
        this.codeInspections = codeInspections;
    }
}
