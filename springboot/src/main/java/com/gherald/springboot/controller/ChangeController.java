package com.gherald.springboot.controller;

import com.gherald.springboot.dao.FileRepository;
import com.gherald.springboot.dao.AuthorRepository;
import com.gherald.springboot.dto.ChangeDto;
import com.gherald.springboot.dto.FileDto;
import com.gherald.springboot.dto.AuthorDto;
import com.gherald.springboot.model.Change;
import com.gherald.springboot.dao.ChangeRepository;
import com.gherald.springboot.model.File;
import com.gherald.springboot.model.Author;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ChangeController {

    @Autowired
    private ChangeRepository changeRepository;

    @Autowired
    private FileRepository fileDiffRepository;

    @Autowired
    private AuthorRepository authorRepository;

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
            change.setInsertions(jsonObject.getInt("insertions"));
            change.setDeletions(jsonObject.getInt("deletions"));
            change.setNumber(jsonObject.getInt("_number"));

//            JSONObject submitterObj = jsonObject.getJSONObject("submitter");
//            User submitter = new User();
//            submitter.setAccountId(submitterObj.getInt("_account_id"));
//            submitter.setName(submitterObj.getString("name"));
//            submitter.setEmail(submitterObj.getString("email"));
//            submitter.setUsername(submitterObj.getString("username"));
//            userRepository.save(submitter);
//            change.setSubmitter(submitter);
//
            JSONObject ownerObj = jsonObject.getJSONObject("owner");
            Author author = new Author();
            author.setAccountId(ownerObj.getInt("_account_id"));
            author.setName(ownerObj.getString("name"));
            author.setEmail(ownerObj.getString("email"));
            author.setUsername(ownerObj.getString("username"));
            authorRepository.save(author);
            change.setAuthor(author);

            List files = new ArrayList<>();
            File file = new File();
            file.setFilename("test/file");
            file.setCodeA("Code A");
            file.setCodeB("Code B");
            file.setChange(change);
            files.add(file);
//            change.setFiles(files);
            changeRepository.save(change);
            fileDiffRepository.save(file);
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

    @GetMapping("/api/changes/{id}")
//    public ResponseEntity<ChangeDto> getChangeById(@PathVariable String id) {
//        ChangeDto changeDto = convertToDto(changeRepository.findChangeById(id));
//        return new ResponseEntity<ChangeDto>(changeDto, HttpStatus.OK);
//    }
    public ChangeDto getChangeById(@PathVariable String id) {
        ChangeDto changeDto = convertToDto(changeRepository.findChangeById(id));
        return changeDto;
    }
//    public String getChangeById(@PathVariable String id) {
//        String uri = String.format("https://codereview.qt-project.org/changes/?q=%s+AND+project:qt/qtbase+AND+branch:dev&o=DETAILED_LABELS&o=CURRENT_REVISION&o=ALL_FILES&o=CURRENT_COMMIT&o=DETAILED_ACCOUNTS", id);
//        RestTemplate restTemplate = new RestTemplate();
//        String result = restTemplate.getForObject(uri, String.class);
//        result = result.substring(6, (result.length() - 2));
////        JSONObject jsonObject = new JSONObject(result);
//        return result;
//    }

    @GetMapping("/api/changes/{id}/files")
    public String getChangeFilesById(@PathVariable String id) {
        String uri = String.format("https://codereview.qt-project.org/changes/%s/revisions/1/files", id);
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(uri, String.class);
        result = result.substring(5, (result.length() - 1));
        return result;
    }

//    @GetMapping("/api/changes/{id}/{file}/diff")
//    public String getChangeFilesById(@PathVariable String id, @PathVariable String file) {
//        String uri = String.format("https://codereview.qt-project.org/changes/%s/revisions/1/files/%s/diff" +
//                "", id, file);
//        RestTemplate restTemplate = new RestTemplate();
//        String result = restTemplate.getForObject(uri, String.class);
//        ResponseEntity<String> response
//                = restTemplate.getForEntity(uri, String.class);
//        result = result.substring(5, (result.length() - 1));
//        return result;
//    }

    private ChangeDto convertToDto(Change change) {
        ChangeDto changeDto = new ChangeDto(change.getId(), change.getProject(), change.getBranch(), change.getSubject(), change.getStatus(), change.getCreated(), change.getUpdated(), change.getInsertions(), change.getDeletions(), change.getNumber());
        List<FileDto> files = new ArrayList<>();
        for (File file : change.getFiles()) {
            FileDto fileDto = new FileDto(file.getFilename(), file.getCodeA(), file.getCodeB());
            files.add(fileDto);
        }
        changeDto.setFiles(files);
        AuthorDto authorDto = new AuthorDto(change.getAuthor().getAccountId(), change.getAuthor().getName(), change.getAuthor().getEmail(), change.getAuthor().getUsername());
        changeDto.setAuthor(authorDto);
        return changeDto;
    }
}
