package com.gherald.springboot.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String filename;

    private String status;

    private Integer insertions;

    private Integer deletions;

    @Column(columnDefinition = "LONGTEXT")
    private String codeA;

    @Column(columnDefinition = "LONGTEXT")
    private String codeB;

    @Column(columnDefinition = "LONGTEXT")
    private String diff;

    private Integer priorBugs;

    private Integer priorChanges;

    @ManyToOne
    private Change change;

    @OneToMany(mappedBy = "file", cascade = CascadeType.ALL)
    private List<Method> methods;

    @OneToMany(mappedBy = "file", cascade = CascadeType.ALL)
    private List<Line> lines;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Change getChange() {
        return change;
    }

    public void setChange(Change change) {
        this.change = change;
    }

    public List<Method> getMethods() {
        return methods;
    }

    public void setMethods(List<Method> methods) {
        this.methods = methods;
    }

    public List<Line> getLines() {
        return lines;
    }

    public void setLines(List<Line> lines) {
        this.lines = lines;
    }
}
