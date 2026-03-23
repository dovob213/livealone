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

        if (request.getMethod().equals("OPTIONS")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 요청 헤더에서 토큰 꺼내기
        String token = resolveToken(request);

        System.out.println("--------------------------------------------------");
        System.out.println("1. 요청 URL: " + request.getRequestURI());
        System.out.println("2. 헤더에서 꺼낸 토큰: " + token);

        // 토큰이 있고, 유효하면
        if (token != null && jwtTokenProvider.validateToken(token)) {
            // 토큰에서 인증 정보(Authentication)를 가져오기
            System.out.println("3. 토큰 유효함! 인증 통과!");
            Authentication auth = jwtTokenProvider.getAuthentication(token);

            // 스프링 시큐리티에게 로그인 됐다고 알려주기 (Context에 저장)
            SecurityContextHolder.getContext().setAuthentication(auth);
        } else{
            System.out.println("3. 토큰이 없거나 유효하지 않음 (일단통과)");
        }

        // 다음 필터로 넘기기
        filterChain.doFilter(request, response);
    }


    // 헤더에서 "Bearer " 떼고 토큰만 추출하기
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }


}