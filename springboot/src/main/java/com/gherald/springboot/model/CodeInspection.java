package com.gherald.springboot.model;

import javax.persistence.*;

@Entity
@Table(name="code_inspection")
public class CodeInspection {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String file;

    private Integer line;

    @Column(columnDefinition = "LONGTEXT")
    private String comment;

    @ManyToOne
    private ChangeReview changeReview;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public ChangeReview getChangeReview() {
        return changeReview;
    }

    public void setChangeReview(ChangeReview changeReview) {
        this.changeReview = changeReview;
    }
}
