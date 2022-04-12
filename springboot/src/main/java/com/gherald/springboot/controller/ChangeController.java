package com.gherald.springboot.controller;

import com.gherald.springboot.model.Change;
import com.gherald.springboot.repository.ChangeRepository;
import org.apache.tomcat.util.json.JSONParser;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class ChangeController {

    @Autowired
    private ChangeRepository changeRepository;

    @PostMapping("/api/changes/add")
    public String addChange(@RequestParam String id) {
        Change change = new Change();
        String uri = String.format("https://codereview.qt-project.org/changes/?q=%s+AND+project:qt/qtbase+AND+branch:dev&o=DETAILED_LABELS&o=ALL_REVISIONS&o=ALL_FILES&o=ALL_COMMITS&o=DETAILED_ACCOUNTS", id);
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(uri, String.class);
        result = result.substring(6, (result.length() - 2));
        try {
            JSONObject jsonObject = new JSONObject(result);
            change.setId(id);
            change.setProject(jsonObject.getString("project"));
            change.setBranch(jsonObject.getString("branch"));
            change.setSubject(jsonObject.getString("subject"));
            change.setStatus(jsonObject.getString("status"));
            change.setCreated(jsonObject.getString("created"));
            change.setUpdated(jsonObject.getString("updated"));
            change.setSubmitted(jsonObject.getString("submitted"));
            change.setInsertions(jsonObject.getInt("insertions"));
            change.setDeletions(jsonObject.getInt("deletions"));
            change.set_number(jsonObject.getInt("_number"));
            changeRepository.save(change);
            System.out.println("OBJECT : "+jsonObject.toString());
        } catch (JSONException err) {
            System.out.println("Exception : "+err.toString());
        }
        System.out.println(result);
        return "Added new change to repo";
    }

    @GetMapping("/api/changes")
    public Iterable<Change> getChanges() {
        return changeRepository.findAll();
    }
}
