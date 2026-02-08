package com.springboot.livealone.config.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collections;
import java.util.Set;


@Component
public class JwtTokenProvider {

    // application.yml에 설정한 값들을 가져옵니다.
    @Value("${jwt.secret}")
    private String salt;

    @Value("${jwt.access-expiration}")
    private long accessExpiration;
    @Value("${jwt.refresh-expiration}")
    private long refreshExpiration;

    private SecretKey secretKey;

    @PostConstruct
    protected void init() {
        // 비밀키를 암호화 알고리즘에 맞게 변환합니다.
        this.secretKey = Keys.hmacShaKeyFor(salt.getBytes(StandardCharsets.UTF_8));
    }

    // 1. Access Token 생성
    public String createAccessToken(Long userId, String email, String role) {
        Claims claims = Jwts.claims().subject(email).build();
        // 토큰에 담을 정보들 (Claims)
        Date now = new Date();

        return Jwts.builder()
                .claims(claims)
                .claim("userId", userId)
                .claim("role", role)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + accessExpiration)) // 만료 시간
                .signWith(secretKey) // 암호화
                .compact();
    }

    // 2. 토큰에서 유저 이메일 추출
    public String getEmail(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    // 3. 토큰 유효성 검사
    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // 토큰이 위조되었거나 만료되었을 때
            return false;
        }
    }


    // 추가할 메서드: 토큰에서 인증 정보 조회
    public Authentication getAuthentication(String token) {
        // 토큰에서 이메일 끄집어내기
        Claims claims = Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        String email = claims.getSubject();
        String role = claims.get("role", String.class); // "USER" or "ADMIN"

        // 스프링 시큐리티가 이해하는 "권한 객체" 만들기
        Set<SimpleGrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority("ROLE_" + role));

        // 스프링 시큐리티용 유저 객체 생성 (비밀번호는 몰라서 빈 문자열 넣음)
        UserDetails principal = new User(email, "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }


}