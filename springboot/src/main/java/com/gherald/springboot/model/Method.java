package com.gherald.springboot.model;

import javax.persistence.*;

@Entity
public class Method {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    private Integer startLine;

    private Integer endLine;

    private Integer priorChanges;

    private Integer priorBugs;

    @ManyToOne
    private File file;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }
}
