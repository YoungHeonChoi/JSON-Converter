package com.okerry.jsonconverter;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/apiCall")
public class ApiController {

    @Value("${github.api.client.id}")
    private String clientId;

    @Value("${github.api.client.secret}")
    private String secretId;

    @PostMapping("/getToken")
    public ResponseEntity<String> getToken(@RequestBody Map<String, String> requestData, HttpSession session) throws IOException {
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
            System.err.println(responseBody);
            if (responseBody != null && responseBody.contains("error")) {
                return ResponseEntity.ok("failed");
            }

            String accessToken = extractAccessToken(responseBody);

            if (accessToken != null) {
                // 세션에 access_token 저장
                session.setAttribute("access_token", accessToken);

                return ResponseEntity.ok(accessToken);
            } else {
                return ResponseEntity.ok("failed to extract access token");
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/getUserInfo")
    public ResponseEntity<String> getUserInfo(@RequestBody Map<String, String> requestData, HttpSession session) throws IOException {
        String url = "https://api.github.com/user"; // 외부 API URL

        try {
            // 세션에서 access_token 가져오기
//            String accessToken = (String) session.getAttribute("access_token");
//            if (accessToken == null) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Access token not found in session.");
//            }

            // RestTemplate 객체 생성
            RestTemplate restTemplate = new RestTemplate();

            // 요청 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + requestData.get("accessToken"));  // Authorization 헤더에 Bearer 토큰 추가
            headers.set("Accept", "application/json");  // 응답 형식을 JSON으로 설정

            // 요청 엔티티 생성
            HttpEntity<String> entity = new HttpEntity<>(headers);

            // GET 요청 보내기
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            // 응답 처리
            if (response.getStatusCode() == HttpStatus.OK) {
                // 응답 본문 출력 (JSON 형식)
                String responseBody = response.getBody();
                System.out.println("Response Body: " + responseBody);

                // 응답을 그대로 클라이언트에게 리턴
                return ResponseEntity.ok(responseBody);
            } else {
                // 요청 실패 시
                return ResponseEntity.status(response.getStatusCode()).body("Request failed with status: " + response.getStatusCode());
            }
        } catch (Exception e) {
            // 예외 발생 시
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    // access_token 추출
    private String extractAccessToken(String responseBody) {
        String regex = "access_token=([a-zA-Z0-9_]+)";  // access_token=뒤에 있는 값을 추출
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(responseBody);

        if (matcher.find()) {
            return matcher.group(1);  // 첫 번째 그룹 (토큰 값) 반환
        }
        return null;  // 토큰을 찾을 수 없으면 null 반환
    }
}