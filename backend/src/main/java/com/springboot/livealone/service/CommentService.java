package com.springboot.livealone.service;

import com.springboot.livealone.dto.response.CommentResponseDto; // (아직 안 만듦 - 곧 만들 예정)
import com.springboot.livealone.entity.Comment;
import com.springboot.livealone.entity.Post;
import com.springboot.livealone.entity.User;
import com.springboot.livealone.repository.CommentRepository;
import com.springboot.livealone.repository.PostRepository;
import com.springboot.livealone.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Transactional
    public void writeComment(Long postId, String content, String email) {

        User user = userRepository.findByEmail(email) // 유저 찾기
                .orElseThrow(() -> new IllegalArgumentException("유저 없음"));

        Post post = postRepository.findById(postId) // 게시글 찾기
                .orElseThrow(() -> new IllegalArgumentException("게시글 없음"));

        Comment comment = new Comment(content, post, user); // 댓글 저장
        commentRepository.save(comment);
    }

    @Transactional(readOnly = true)
    public List<CommentResponseDto> getComments(Long postId) {
        // post_id로 댓글 다 찾기 -> DTO로 변환 -> 리스트 반환
        return commentRepository.findByPostId(postId).stream()
                .map(CommentResponseDto::new)
                .collect(Collectors.toList());
    }
}