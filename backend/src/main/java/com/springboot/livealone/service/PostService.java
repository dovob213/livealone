package com.springboot.livealone.service;

import com.springboot.livealone.dto.request.PostCreateDto;
import com.springboot.livealone.dto.response.PostResponseDto;
import com.springboot.livealone.entity.Post;
import com.springboot.livealone.entity.User;
import com.springboot.livealone.repository.PostRepository;
import com.springboot.livealone.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Transactional
    public Long write(PostCreateDto dto, String email) {
        // 글 쓴 사람 찾기 (이메일)
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));

        // 게시글 엔티티 생성 (제목, 내용, 작성자User)
        Post post = new Post(dto.getTitle(), dto.getContent(), user);

        // DB에 저장
        postRepository.save(post);

        return post.getId(); // 저장된 글 번호 반환
    }

    @Transactional(readOnly = true) // 읽기 전용
    public List<PostResponseDto> getList() {
        return postRepository.findAll().stream() // 모든 글 가져와서
                .map(PostResponseDto::new)       // DTO로 변환
                .collect(Collectors.toList());   // 리스트로 반환
    }
}