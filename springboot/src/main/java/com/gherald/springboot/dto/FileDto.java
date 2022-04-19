package com.gherald.springboot.dto;

public class FileDto {
    private String filename;
    private String codeA;
    private String codeB;

    public FileDto(String filename, String codeA, String codeB) {
        this.filename = filename;
        this.codeA = codeA;
        this.codeB = codeB;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
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
}
