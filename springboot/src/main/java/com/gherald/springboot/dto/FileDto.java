package com.gherald.springboot.dto;

public class FileDto {
    private String filename;
    private String status;
    private Integer insertions;
    private Integer deletions;
    private String codeA;
    private String codeB;

    private String diff;

    public FileDto(String filename, String status, Integer insertions, Integer deletions, String codeA, String codeB, String diff) {
        this.filename = filename;
        this.status = status;
        this.insertions = insertions;
        this.deletions = deletions;
        this.codeA = codeA;
        this.codeB = codeB;
        this.diff = diff;
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
}
