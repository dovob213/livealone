package com.springboot.livealone.config.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 1. 요청 헤더에서 토큰 꺼내기.
        String token = resolveToken(request);

        // 2. 토큰이 있고, 유효하면
        if (token != null && jwtTokenProvider.validateToken(token)) {
            // 3. 토큰에서 인증 정보(Authentication)를 가져온다.
            Authentication auth = jwtTokenProvider.getAuthentication(token);

            // 4. 스프링 시큐리티에게 "이 사람 로그인 됐어!"라고 알려준다. (Context에 저장)
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        // 5. 다음 필터로 넘긴다. (계속 가세요~)
        filterChain.doFilter(request, response);
    }

    // 헤더에서 "Bearer "를 떼고 토큰만 추출하는 메서드
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}