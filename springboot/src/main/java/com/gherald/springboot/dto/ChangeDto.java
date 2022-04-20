package com.gherald.springboot.dto;

import java.util.List;

public class ChangeDto {
    private String id;
    private String project;
    private String branch;
    private String subject;
    private String status;
    private String created;
    private String updated;
    private String submitted;
    private Integer insertions;
    private Integer deletions;
    private Integer number;
    private List<FileDto> files;
    private AuthorDto author;
    private String parent;
    private String commitMsg;

    public ChangeDto(String id, String project, String branch, String subject, String status, String created, String updated, Integer insertions, Integer deletions, Integer number, String parent, String commitMsg) {
        this.id = id;
        this.project = project;
        this.branch = branch;
        this.subject = subject;
        this.status = status;
        this.created = created;
        this.updated = updated;
        this.insertions = insertions;
        this.deletions = deletions;
        this.number = number;
        this.parent = parent;
        this.commitMsg = commitMsg;
    }

    public void setFiles(List<FileDto> files) {
        this.files = files;
    }

    public void setAuthor(AuthorDto author) {
        this.author = author;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public String getUpdated() {
        return updated;
    }

    public void setUpdated(String updated) {
        this.updated = updated;
    }

    public String getSubmitted() {
        return submitted;
    }

    public void setSubmitted(String submitted) {
        this.submitted = submitted;
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

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public List<FileDto> getFiles() {
        return files;
    }

    public AuthorDto getAuthor() {
        return author;
    }

    public String getParent() {
        return parent;
    }

    public void setParent(String parent) {
        this.parent = parent;
    }

    public String getCommitMsg() {
        return commitMsg;
    }

    public void setCommitMsg(String commitMsg) {
        this.commitMsg = commitMsg;
    }
}
