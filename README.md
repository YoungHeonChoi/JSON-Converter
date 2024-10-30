# JSON-Converter

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
