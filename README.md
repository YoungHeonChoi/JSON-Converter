### 2024-10-30
Spring Boot 기동시 로그인 페이지가 표시되는 이유는 Spring Security가 자동으로 설정되었기 때문이다.  
(Spring Security는 웹 애플리케이션의 보안을 강화하고자 기본적으로 로그인 페이지를 활성화합니다.)  

로그인 페이지가 뜨지 않게하기 위해서는 Spring Security의 설정을 수정하여 로그인 요구를 제거하거나, 특정 엔드포인트에 인증이 필요하지 않도록 설정할 수 있다.
```
// Spring Boot 3버전 이하
// SecurityConfig.java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // CSRF 비활성화 (필요에 따라)
            .authorizeRequests()
            .antMatchers("/upload").permitAll() // /upload 경로 인증 없이 접근 허용
            .anyRequest().authenticated() // 나머지 경로는 인증 필요
            .and()
            .formLogin().disable(); // 기본 로그인 페이지 비활성화 (선택 사항)

        return http.build();
    }
}

```
```
// Spring Boot 3버전 이상
// SecurityConfig.java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // CSRF 비활성화
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/upload").permitAll() // /upload 엔드포인트 인증 없이 접근 허용
                        .anyRequest().authenticated() // 나머지 경로는 인증 필요
                )
                .formLogin(form -> form.disable()); // 기본 로그인 페이지 비활성화

        return http.build();
    }
}
```

<br />

Next.js에서 Spring Boot로 request를 보낼 때 서로 다른 포트에서 실행되고 있으므로, Spring Boot에 CORS 설정을 추가해야한다.
```
// WebConfig.java
package com.okerry.jsonconverter.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000") // Next.js 서버 주소
                        .allowedMethods("POST", "GET", "PUT", "DELETE")
                        .allowedHeaders("*");
            }
        };
    }
}
```

<br />

만약 데이터베이스 연결이 필요 없는 애플리케이션이라면, application.properties 또는 application.yml 파일에 데이터 소스 자동 구성을 비활성화하는 설정을 추가할 수 있다.
(초반 설정 시점에 사용했던 방법)
```
// application.properties
# spring.datasource.url=
spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
```
```
// application.yml
spring:
  autoconfigure:
    exclude: org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
```

