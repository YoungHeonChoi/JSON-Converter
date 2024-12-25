package com.okerry.jsonconverter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/apiCall")
public class ApiController {

    @Value("${github.api.client.id}")
    private String clientId;

    @Value("${github.api.client.secret}")
    private String secretId;

    @PostMapping("/getToken")
    public ResponseEntity<String> getOAuthToken(@RequestBody Map<String, String> requestData) throws IOException {
        String url = "https://github.com/login/oauth/access_token"; // 외부 API URL

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 요청 본문 작성
        Map<String, String> body = new HashMap<>();
        body.put("client_id", clientId);
        body.put("client_secret", secretId);
        body.put("code", requestData.get("code"));

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);

        try {
            // POST 요청
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

            // 응답 본문 확인
            String responseBody = response.getBody();

            if (responseBody != null && responseBody.contains("error")) {
                return ResponseEntity.ok("failed");
            }
            return ResponseEntity.ok("complete");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
}