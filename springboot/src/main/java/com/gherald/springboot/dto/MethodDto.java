package com.gherald.springboot.dto;

public class MethodDto {

    private String name;

    private Integer startLine;

    private Integer endLine;

    private Integer priorChanges;

    private Integer priorBugs;

    public MethodDto(String name, Integer startLine, Integer endLine, Integer priorChanges, Integer priorBugs) {
        this.name = name;
        this.startLine = startLine;
        this.endLine = endLine;
        this.priorChanges = priorChanges;
        this.priorBugs = priorBugs;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getStartLine() {
        return startLine;
    }

    public void setStartLine(Integer startLine) {
        this.startLine = startLine;
    }

    public Integer getEndLine() {
        return endLine;
    }

    public void setEndLine(Integer endLine) {
        this.endLine = endLine;
    }

    public Integer getPriorChanges() {
        return priorChanges;
    }

    public void setPriorChanges(Integer priorChanges) {
        this.priorChanges = priorChanges;
    }

    public Integer getPriorBugs() {
        return priorBugs;
    }

    public void setPriorBugs(Integer priorBugs) {
        this.priorBugs = priorBugs;
    }
}
