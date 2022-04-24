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

    @ManyToMany(mappedBy = "participant", cascade = CascadeType.ALL)
    private List<Change> changes;

    @OneToMany(mappedBy = "participant", cascade = CascadeType.ALL)
    private List<ChangeReview> changeReviews;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Change> getChanges() {
        return changes;
    }

    public void setChanges(List<Change> changes) {
        this.changes = changes;
    }

    public List<ChangeReview> getChangeReviews() {
        return changeReviews;
    }

    public void setChangeReviews(List<ChangeReview> changeReviews) {
        this.changeReviews = changeReviews;
    }
}
