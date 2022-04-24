package com.gherald.springboot.dto;

import com.gherald.springboot.model.Change;
import com.gherald.springboot.model.ChangeReview;

import java.util.List;

public class ParticipantDto {
    private String id;
    private List<String> changes;
    private List<ChangeReviewDto> changeReviews;

    public ParticipantDto(String id, List<String> changes, List<ChangeReviewDto> changeReviews) {
        this.id = id;
        this.changes = changes;
        this.changeReviews = changeReviews;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<String> getChanges() {
        return changes;
    }

    public void setChanges(List<String> changes) {
        this.changes = changes;
    }

    public List<ChangeReviewDto> getChangeReviews() {
        return changeReviews;
    }

    public void setChangeReviews(List<ChangeReviewDto> changeReviews) {
        this.changeReviews = changeReviews;
    }
}
