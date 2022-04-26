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

    @OneToMany(mappedBy = "participant", cascade = CascadeType.ALL)
    private List<ChangeReview> changeReviews;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<ChangeReview> getChangeReviews() {
        return changeReviews;
    }

    public void setChangeReviews(List<ChangeReview> changeReviews) {
        this.changeReviews = changeReviews;
    }
}
