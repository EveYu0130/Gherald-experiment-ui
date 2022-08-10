package com.gherald.springboot.dto;

import java.util.List;

public class FileDto {
    private String filename;
    private String status;
    private Integer insertions;
    private Integer deletions;
    private String codeA;
    private String codeB;

    private String diff;

    private Integer priorBugs;

    private Integer priorChanges;

    private List<MethodDto> methods;

    private List<LineDto> lines;

    public FileDto(String filename, String status, Integer insertions, Integer deletions, String codeA, String codeB, String diff, Integer priorBugs, Integer priorChanges) {
        this.filename = filename;
        this.status = status;
        this.insertions = insertions;
        this.deletions = deletions;
        this.codeA = codeA;
        this.codeB = codeB;
        this.diff = diff;
        this.priorBugs = priorBugs;
        this.priorChanges = priorChanges;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getInsertions() {
        return insertions;
    }

    public void setInsertions(Integer insertions) {
        this.insertions = insertions;
    }

    public Integer getDeletions() {
        return deletions;
    }

    public void setDeletions(Integer deletions) {
        this.deletions = deletions;
    }

    public String getCodeA() {
        return codeA;
    }

    public void setCodeA(String codeA) {
        this.codeA = codeA;
    }

    public String getCodeB() {
        return codeB;
    }

    public void setCodeB(String codeB) {
        this.codeB = codeB;
    }

    public String getDiff() {
        return diff;
    }

    public void setDiff(String diff) {
        this.diff = diff;
    }

    public Integer getPriorBugs() {
        return priorBugs;
    }

    public void setPriorBugs(Integer priorBugs) {
        this.priorBugs = priorBugs;
    }

    public Integer getPriorChanges() {
        return priorChanges;
    }

    public void setPriorChanges(Integer priorChanges) {
        this.priorChanges = priorChanges;
    }

    public List<MethodDto> getMethods() {
        return methods;
    }

    public void setMethods(List<MethodDto> methods) {
        this.methods = methods;
    }

    public List<LineDto> getLines() {
        return lines;
    }

    public void setLines(List<LineDto> lines) {
        this.lines = lines;
    }
}
