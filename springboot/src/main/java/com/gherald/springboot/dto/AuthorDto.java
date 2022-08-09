package com.gherald.springboot.dto;

public class AuthorDto {
    private Integer accountId;
    private String name;
    private String email;
    private String username;

    private String project;

    public AuthorDto(Integer accountId, String name, String email, String username, String project) {
        this.accountId = accountId;
        this.name = name;
        this.email = email;
        this.username = username;
        this.project = project;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }
}
