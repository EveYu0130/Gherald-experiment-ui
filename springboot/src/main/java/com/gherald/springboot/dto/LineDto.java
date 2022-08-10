package com.gherald.springboot.dto;

public class LineDto {

    private Integer lineNumber;

    private String code;

    private Float riskScore;

    public LineDto(Integer lineNumber, String code, Float riskScore) {
        this.lineNumber = lineNumber;
        this.code = code;
        this.riskScore = riskScore;
    }

    public Integer getLineNumber() {
        return lineNumber;
    }

    public void setLineNumber(Integer lineNumber) {
        this.lineNumber = lineNumber;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Float getRiskScore() {
        return riskScore;
    }

    public void setRiskScore(Float riskScore) {
        this.riskScore = riskScore;
    }
}
