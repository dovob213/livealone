package com.springboot.livealone.controller;

import com.springboot.livealone.dto.request.UserJoinDto;
import com.springboot.livealone.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;import com.springboot.livealone.dto.request.LoginDto;

@RestController
@RequestMapping("/api/users") // 이 컨트롤러의 모든 주소는 /api/users로 시작
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // POST /api/users/join
    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody UserJoinDto dto) {
        // @RequestBody: 리액트가 보낸 JSON 데이터를 DTO 객체로 변환
        Long userId = userService.join(dto);

        return ResponseEntity.ok("회원가입 성공했슈. 생성된 ID: " + userId);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto dto) {
        String token = userService.login(dto);

        // HTTP 헤더나 바디에 토큰 보내기
        return ResponseEntity.ok(token);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() { // 토큰없이 get -> 403
        return ResponseEntity.ok("토큰 인증 성공! 당신은 유령회원이 아닙니다!");
    }
}