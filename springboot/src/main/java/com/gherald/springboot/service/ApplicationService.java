//package com.gherald.springboot.service;
//
//import com.gherald.springboot.dao.ChangeRepository;
//import com.gherald.springboot.dao.FileRepository;
//import com.gherald.springboot.model.Change;
//import org.json.JSONException;
//import org.json.JSONObject;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import javax.transaction.Transactional;
//
//@Service
//public class ApplicationService {
//
//    @Autowired
//    ChangeRepository changeRepository;
//
//    @Autowired
//    FileRepository fileRepository;
//
//    @Transactional
//    public Change createChange(String id) {
//        Change change = new Change();
//        String uri = String.format("https://codereview.qt-project.org/changes/?q=%s+AND+project:qt/qtbase+AND+branch:dev&o=DETAILED_LABELS&o=ALL_REVISIONS&o=ALL_FILES&o=ALL_COMMITS&o=DETAILED_ACCOUNTS", id);
//        RestTemplate restTemplate = new RestTemplate();
//        String result = restTemplate.getForObject(uri, String.class);
//        result = result.substring(6, (result.length() - 2));
//        try {
//            JSONObject jsonObject = new JSONObject(result);
//            change.setId(id);
//            change.setProject(jsonObject.getString("project"));
//            change.setBranch(jsonObject.getString("branch"));
//            change.setSubject(jsonObject.getString("subject"));
//            change.setStatus(jsonObject.getString("status"));
//            change.setCreated(jsonObject.getString("created"));
//            change.setUpdated(jsonObject.getString("updated"));
//            change.setInsertions(jsonObject.getInt("insertions"));
//            change.setDeletions(jsonObject.getInt("deletions"));
//            change.setNumber(jsonObject.getInt("_number"));
//            changeRepository.save(change);
//            System.out.println("OBJECT : "+jsonObject.toString());
//        } catch (JSONException err) {
//            System.out.println("Exception : "+err.toString());
//        }
//        System.out.println(result);
//        return change;
//    }
//}
