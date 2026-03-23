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

    // application.yml에 설정값 가져오기
    @Value("${jwt.secret}")
    private String salt;

    @Value("${jwt.access-expiration}")
    private long accessExpiration;
    @Value("${jwt.refresh-expiration}")
    private long refreshExpiration;

    private SecretKey secretKey;

    @PostConstruct
    protected void init() {
        // 비밀키 암호화
        this.secretKey = Keys.hmacShaKeyFor(salt.getBytes(StandardCharsets.UTF_8));
    }

    // Access Token 생성
    public String createAccessToken(Long userId, String email, String role) {
        Claims claims = Jwts.claims().subject(email).build();
        // 토큰에 담을 정보 (Claims)
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

    // 토큰에서 이메일 추출
    public String getEmail(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
    // 토큰 유효성 검사하기
    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // 토큰이 위조되었거나 만료되었을때
            return false;
        }
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        String email = claims.getSubject();
        String role = claims.get("role", String.class); // "USER" 혹은 "ADMIN"

        // 스프링 시큐리티) "권한 객체" 만들기
        Set<SimpleGrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority("ROLE_" + role));

        // 스프링 시큐리티용 유저 객체 생성
        UserDetails principal = new User(email, "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }


}