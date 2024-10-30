package com.okerry.jsonconverter;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/upload")
public class FileUploadController {
    @PostMapping
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty.");
        }

        // 파일 정보 로깅 (파일 이름과 크기)
        String fileName = file.getOriginalFilename();
        long fileSize = file.getSize();

        System.out.println("Uploaded file name: " + fileName);
        System.out.println("Uploaded file size: " + fileSize);

        return ResponseEntity.ok("File uploaded successfully: " + fileName);
    }
}
