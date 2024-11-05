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

<br />

### 2024-11-05
`layout.tsx`는 Next.js 13 이상에서 새롭게 도입된 기능으로, 페이지와 컴포넌트의 구조를 정의하고 반복되는 UI 요소를 쉽게 관리할 수 있게 해준다.  
Next.js의 app router 기능을 활용하는 경우, `layout.tsx`는 파일 시스템 기반 라우팅을 통한 페이지별 레이아웃 구성을 돕고, 이 기능을 최적화하여 사용하는 방법은 다음과 같다.

## 1. 페이지별 layout.tsx 파일 생성

Next.js는 파일 시스템 기반의 라우팅을 사용하기 때문에, 각 폴더에 `layout.tsx` 파일을 생성해 해당 경로 하위의 페이지에 적용할 레이아웃을 설정할 수 있다. 
 
예를 들어, `/dashboard` 페이지에 적용할 레이아웃이 필요하다면, `app/dashboard/layout.tsx` 파일을 만들어 그 내부에 공통 요소를 정의한다.

```typescript
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>Dashboard Header</header>
      <main>{children}</main>
      <footer>Dashboard Footer</footer>
    </div>
  );
}
```

위 코드에서는 `/dashboard` 경로의 모든 페이지에 공통 헤더와 푸터가 자동으로 적용된다.

## 2. layout.tsx의 재사용을 통한 UI 일관성 유지

사이트 전반에서 동일하게 사용할 레이아웃은 `app/layout.tsx`에 정의하여 일관성을 유지한다.  
이렇게 하면 각 페이지에서 반복적으로 코드를 작성할 필요 없이 상위 레이아웃에서 공통 요소가 적용된다.

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>Global Header</header>
        <main>{children}</main>
        <footer>Global Footer</footer>
      </body>
    </html>
  );
}
```

## 3. 동적 메타데이터 설정

`layout.tsx`를 통해 페이지별로 동적인 메타데이터를 설정할 수 있다.  
Next.js의 metadata API를 사용하여 페이지마다 SEO에 최적화된 메타데이터를 설정하는 것이 좋다.

```typescript
// app/dashboard/layout.tsx
export const metadata = {
  title: 'Dashboard - My App',
  description: 'User dashboard for managing your account.',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>Dashboard Header</header>
      <main>{children}</main>
      <footer>Dashboard Footer</footer>
    </div>
  );
}
```

## 4. Suspense와 Error Boundary로 레이아웃 강화

`React.Suspense`와 `ErrorBoundary`를 레이아웃에 추가하여 비동기 데이터 로딩 중 로딩 스피너를 보여주거나 오류 발생 시 예외 처리를 할 수 있다.

```typescript
import React, { Suspense } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>Global Header</header>
        <Suspense fallback={<div>Loading...</div>}>
          <main>{children}</main>
        </Suspense>
        <footer>Global Footer</footer>
      </body>
    </html>
  );
}
```

## 5. Context API와의 조합

`layout.tsx`에서 Context API를 사용해 전역 상태를 관리할 수도 있다.  

예를 들어, 로그인 정보를 제공하거나 다크 모드 설정을 유지하기 위해 Context를 활용할 수 있다.

```typescript
import ThemeProvider from '../context/ThemeProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <header>Global Header</header>
          <main>{children}</main>
          <footer>Global Footer</footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
```
