package com.okerry.jsonconverter;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/upload")
public class FileUploadController {
    @PostMapping
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) throws IOException {

        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty.");
        }

        // 파일 정보 로깅 (파일 이름과 크기)
        String fileName = file.getOriginalFilename();
        long fileSize = file.getSize();
        String content = new String(file.getBytes(), StandardCharsets.UTF_8);
        String markdown = convertJsonToMarkdown(content);

        System.out.println("Uploaded file name: " + fileName);
        System.out.println("Uploaded file size: " + fileSize);
        System.out.println("Uploaded file content: " + content);
        System.out.println("Uploaded file content: " + markdown);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("text/markdown"))
                .body(markdown);
    }

    public static String convertJsonToMarkdown(String json) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(json);

        StringBuilder markdown = new StringBuilder();
        String[] queryArr;

        // User Profile
        markdown.append("# User Profile\n\n");
        markdown.append("- **Username**: ").append(rootNode.path("username").asText()).append("\n");
        markdown.append("- **Email**: ").append(rootNode.path("email").asText()).append("\n");
        markdown.append("- **Country**: ").append(rootNode.path("country").asText()).append("\n");
        markdown.append("- **Name**: ").append(rootNode.path("name").asText()).append("\n");
        markdown.append("- **City**: ").append(rootNode.path("city").asText()).append("\n");
        markdown.append("- **GitHub URL**: ").append(rootNode.path("github_url").asText()).append("\n");
        markdown.append("- **Timezone**: ").append(rootNode.path("timezone").asText()).append("\n");
        markdown.append("- **Hackos**: ").append(rootNode.path("hackos").asInt()).append("\n\n");

        // Submissions
        markdown.append("## Submissions\n\n");

        for (JsonNode submission : rootNode.path("submissions")) {
            queryArr = submission.path("code").asText().split("\n");

            markdown.append("- **challenge**: ").append(submission.path("challenge").asText()).append("\n");
            markdown.append("- **language**: ").append(submission.path("language").asText()).append("\n");
            markdown.append("```").append("\n");

            for(String query : queryArr){
                markdown.append(query).append("\n");
            }

            markdown.append("```").append("\n\n").append("<br>").append("\n\n");
        }

        return markdown.toString();
    }
}
