package com.springboot.livealone.controller;

import com.springboot.livealone.dto.request.CommentCreateDto;
import com.springboot.livealone.dto.response.CommentResponseDto;
import com.springboot.livealone.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    // POST /api/comments/1 -> 1번 게시글에 댓글 달기
    @PostMapping("/{postId}")
    public ResponseEntity<String> write(
            @PathVariable Long postId,
            @RequestBody CommentCreateDto dto,
            Authentication authentication
    ) {
        String email = authentication.getName(); // 로그인한 사람 이메일

        // 서비스에게 "이 게시글(postId)에, 이 사람(email)이, 이 내용(dto)으로 쓴다"고 전달
        commentService.writeComment(postId, dto.getContent(), email);

        return ResponseEntity.ok("댓글 작성 완료!");
    }

    // GET /api/comments/1 -> 1번 게시글의 댓글 다 가져오기
    @GetMapping("/{postId}")
    public ResponseEntity<List<CommentResponseDto>> getComments(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getComments(postId));
    }
}