package com.springboot.livealone.controller;

import com.springboot.livealone.dto.request.PostCreateDto;
import com.springboot.livealone.dto.response.PostResponseDto;
import com.springboot.livealone.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<String> write(@RequestBody PostCreateDto dto, Authentication authentication) {
        // Authentication. 스프링 시큐리티가 넣어준 로그인한 사람 정보
        // Provider. "principal"에. 이메일이 아니라 UserDetails 객체 넣음
        // getName() 호출-> 첫 번째 파라미터(email) (User 객체 만들 때 넣음)

        String email = authentication.getName();

        Long postId = postService.write(dto, email);

        return ResponseEntity.ok(postId + "번 게시글 작성 완료!");
    }

    @GetMapping
    public ResponseEntity<List<PostResponseDto>> getList() {
        return ResponseEntity.ok(postService.getList());
    }
}