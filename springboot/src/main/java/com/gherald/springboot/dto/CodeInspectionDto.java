package com.gherald.springboot.dto;

public class CodeInspectionDto {
    private String file;
    private Integer line;
    private String comment;

    public CodeInspectionDto(String file, Integer line, String comment) {
        this.file = file;
        this.line = line;
        this.comment = comment;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public Integer getLine() {
        return line;
    }

    public void setLine(Integer line) {
        this.line = line;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
