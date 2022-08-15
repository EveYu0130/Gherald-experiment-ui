package com.gherald.springboot.dto;

import com.gherald.springboot.model.CodeInspection;
import com.gherald.springboot.model.Participant;

import java.util.List;

public class ChangeReviewDto {
    private Integer id;
    private ChangeDto change;
    private Integer riskLevel;

    private Integer reviewTime;
    private List<CodeInspectionDto> codeInspections;

    public ChangeReviewDto(Integer id, ChangeDto change, Integer riskLevel, Integer reviewTime, List<CodeInspectionDto> codeInspections) {
        this.id = id;
        this.change = change;
        this.riskLevel = riskLevel;
        this.reviewTime = reviewTime;
        this.codeInspections = codeInspections;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ChangeDto getChange() {
        return change;
    }

    public void setChange(ChangeDto change) {
        this.change = change;
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

    public List<CodeInspectionDto> getCodeInspections() {
        return codeInspections;
    }

    public void setCodeInspections(List<CodeInspectionDto> codeInspections) {
        this.codeInspections = codeInspections;
    }
}
