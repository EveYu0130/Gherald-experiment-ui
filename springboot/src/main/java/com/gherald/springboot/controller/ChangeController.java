package com.gherald.springboot.controller;

import com.gherald.springboot.dao.FileRepository;
import com.gherald.springboot.dao.AuthorRepository;
import com.gherald.springboot.dto.*;
import com.gherald.springboot.model.*;
import com.gherald.springboot.dao.ChangeRepository;
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

    @GetMapping("/api/changes")
    public List<ChangeDto> getChanges() {
        List<ChangeDto> changes = new ArrayList<>();
        for (Change change : changeRepository.findAll()) {
            changes.add(convertToDto(change));
        }
        return changes;
    }

    @GetMapping("/api/changes/{id}")
    public ChangeDto getChangeById(@PathVariable String id) {
        ChangeDto changeDto = convertToDto(changeRepository.findChangeById(id));
        return changeDto;
    }

    @GetMapping("/api/changes/{id}/files")
    public String getChangeFilesById(@PathVariable String id) {
        String uri = String.format("https://codereview.qt-project.org/changes/%s/revisions/1/files", id);
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(uri, String.class);
        result = result.substring(5, (result.length() - 1));
        return result;
    }


    private ChangeDto convertToDto(Change change) {
        ChangeDto changeDto = new ChangeDto(change.getId(), change.getRepo(), change.getBranch(), change.getSubject(), change.getCreated(), change.getUpdated(), change.getInsertions(), change.getDeletions(), change.getNumber(), change.getParent(), change.getCommitMsg(), change.getProject(), change.getAuthorPriorChanges(), change.getAuthorPriorBugs(), change.getRiskScore(), change.getBugDensity());
        List<FileDto> files = new ArrayList<>();
        for (File file : change.getFiles()) {
            FileDto fileDto = new FileDto(file.getFilename(), file.getStatus(), file.getInsertions(), file.getDeletions(), file.getCodeA(), file.getCodeB(), file.getDiff(), file.getPriorBugs(), file.getPriorChanges());
            List<MethodDto> methods = new ArrayList<>();
            for (Method method : file.getMethods()) {
                MethodDto methodDto = new MethodDto(method.getName(), method.getStartLine(), method.getEndLine(), method.getPriorChanges(), method.getPriorBugs());
                methods.add(methodDto);
            }
            fileDto.setMethods(methods);
            List<LineDto> lines = new ArrayList<>();
            for (Line line : file.getLines()) {
                LineDto lineDto = new LineDto(line.getLineNumber(), line.getCode(), line.getRiskScore());
                lines.add(lineDto);
            }
            fileDto.setLines(lines);
            files.add(fileDto);
        }
        changeDto.setFiles(files);
        AuthorDto authorDto = new AuthorDto(change.getAuthor().getAccountId(), change.getAuthor().getName(), change.getAuthor().getEmail(), change.getAuthor().getUsername(), change.getAuthor().getProject());
        changeDto.setAuthor(authorDto);
        return changeDto;
    }
}
