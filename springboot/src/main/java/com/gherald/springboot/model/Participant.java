package com.gherald.springboot.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

@Entity
public class Participant {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private String id;

    private String tool;

    private String project;

    private Integer taskATime;

    @OneToMany(mappedBy = "participant", cascade = CascadeType.ALL)
    private List<ChangeReview> changeReviews;

    @OneToOne(mappedBy = "participant", cascade = CascadeType.ALL)
    private Questionnaire questionnaire;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTool() {
        return tool;
    }

    public void setTool(String tool) {
        this.tool = tool;
    }

    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public Integer getTaskATime() {
        return taskATime;
    }

    public void setTaskATime(Integer taskATime) {
        this.taskATime = taskATime;
    }

    public List<ChangeReview> getChangeReviews() {
        return changeReviews;
    }

    public void setChangeReviews(List<ChangeReview> changeReviews) {
        this.changeReviews = changeReviews;
    }

    public Questionnaire getQuestionnaire() {
        return questionnaire;
    }

    public void setQuestionnaire(Questionnaire questionnaire) {
        this.questionnaire = questionnaire;
    }
}
