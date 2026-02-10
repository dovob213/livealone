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

    // 게시글 조회 (상세보기)
    @Transactional(readOnly = true)
    public PostResponseDto getPost(Long id) {
        // DB에서 id 조회
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));

        // 찾은 엔티티(Post)를 DTO로 반환
        return new PostResponseDto(post);
    }


    // 게시글 삭제
    @Transactional
    public void delete(Long id, String email) {
        // 게시글 있는지 확인
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));

        // 작성자 본인인지 확인
        if (!post.getUser().getEmail().equals(email)) { // post.getUser().getEmail(): 글쓴이 이메일 vs email: 지금 로그인해서 삭제 버튼 누른 사람 이메일
            throw new IllegalArgumentException("작성자만 삭제할 수 있습니다!");
        }

        // 3. 검증 통과했으면 삭제!
        postRepository.delete(post);
    }
}