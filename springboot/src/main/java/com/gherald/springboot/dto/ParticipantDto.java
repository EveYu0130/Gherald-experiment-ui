package com.gherald.springboot.dto;

import com.gherald.springboot.model.Change;
import com.gherald.springboot.model.ChangeReview;

import java.util.List;

public class ParticipantDto {
    private String id;
    private List<ChangeDto> changes;
    private List<ChangeReviewDto> changeReviews;

    public ParticipantDto(String id, List<ChangeDto> changes, List<ChangeReviewDto> changeReviews) {
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

    public List<ChangeDto> getChanges() {
        return changes;
    }

    public void setChanges(List<ChangeDto> changes) {
        this.changes = changes;
    }

    public List<ChangeReviewDto> getChangeReviews() {
        return changeReviews;
    }

    public void setChangeReviews(List<ChangeReviewDto> changeReviews) {
        this.changeReviews = changeReviews;
    }
}
