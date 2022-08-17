package com.gherald.springboot.dto;

import java.util.List;

public class ChangeDto {
    private String id;
    private String repo;
    private String branch;
    private String subject;
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
    private String project;
    private Integer authorPriorChanges;
    private Integer authorPriorBugs;
    private Float riskScore;
    private Float bugDensity;

    public ChangeDto(String id, String repo, String branch, String subject, String created, String updated, Integer insertions, Integer deletions, Integer number, String parent, String commitMsg, String project, Integer authorPriorChanges, Integer authorPriorBugs, Float riskScore, Float bugDensity) {
        this.id = id;
        this.repo = repo;
        this.branch = branch;
        this.subject = subject;
        this.created = created;
        this.updated = updated;
        this.insertions = insertions;
        this.deletions = deletions;
        this.number = number;
        this.parent = parent;
        this.commitMsg = commitMsg;
        this.project = project;
        this.authorPriorChanges = authorPriorChanges;
        this.authorPriorBugs = authorPriorBugs;
        this.riskScore = riskScore;
        this.bugDensity = bugDensity;
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

    public String getRepo() {
        return repo;
    }

    public void setRepo(String repo) {
        this.repo = repo;
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

    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public Integer getAuthorPriorChanges() {
        return authorPriorChanges;
    }

    public void setAuthorPriorChanges(Integer authorPriorChanges) {
        this.authorPriorChanges = authorPriorChanges;
    }

    public Integer getAuthorPriorBugs() {
        return authorPriorBugs;
    }

    public void setAuthorPriorBugs(Integer authorPriorBugs) {
        this.authorPriorBugs = authorPriorBugs;
    }

    public Float getRiskScore() {
        return riskScore;
    }

    public void setRiskScore(Float riskScore) {
        this.riskScore = riskScore;
    }

    public Float getBugDensity() {
        return bugDensity;
    }

    public void setBugDensity(Float bugDensity) {
        this.bugDensity = bugDensity;
    }
}
