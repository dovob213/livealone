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
import com.springboot.livealone.document.PostDocument;
import com.springboot.livealone.repository.PostSearchRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    private final PostSearchRepository postSearchRepository;

    @Transactional
    public Long write(PostCreateDto dto, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));

        // 게시글 엔티티 생성 (제목, 내용, 작성자User)
        Post post = new Post(dto.getTitle(), dto.getContent(), user);

        // DB에 먼저 저장
        Post savedPost = postRepository.save(post);

        // 엘라스틱서치
        PostDocument postDocument = PostDocument.builder()
                .id(savedPost.getId())
                .title(savedPost.getTitle())
                .content(savedPost.getContent())
                .writer(user.getNickname())
                .build();
        postSearchRepository.save(postDocument);

        return savedPost.getId();
    }

    @Transactional(readOnly = true) // 읽기 전용
    public List<PostResponseDto> getList() {
        return postRepository.findAll().stream() // 모든 글 가져와서
                .map(PostResponseDto::new)       // DTO로 변환
                .collect(Collectors.toList());   // 리스트로 반환
    }

    // 상세보기
    @Transactional(readOnly = true)
    public PostResponseDto getPost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));

        return new PostResponseDto(post);
    }


    @Transactional
    public void delete(Long id, String email) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));

        // 작성자 본인인지 확인
        if (!post.getUser().getEmail().equals(email)) {
            throw new IllegalArgumentException("작성자만 삭제할 수 있습니다!");
        }

        postRepository.delete(post);

        // 엘라스틱서치에서도 삭제
        postSearchRepository.deleteById(id);
    }

    @Transactional
    public void updatePost(Long id, com.springboot.livealone.dto.request.PostCreateDto dto, String email) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));

        if (!post.getUser().getEmail().equals(email)) {
            throw new IllegalArgumentException("본인 글만 수정할 수 있습니다.");
        }
        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());

        PostDocument updatedDocument = PostDocument.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .writer(post.getUser().getNickname())
                .build();
        postSearchRepository.save(updatedDocument);
    }

    // 아직 JPA
//    @Transactional(readOnly = true)
//    public List<PostResponseDto> searchPosts(String type, String keyword) {
//
//        List<Post> posts;
//
//        if ("titleContent".equals(type)) {
//            posts = postRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(keyword, keyword);
//        } else if ("writer".equals(type)) {
//            posts = postRepository.findByUserNicknameContainingIgnoreCase(keyword);
//        } else {
//            posts = postRepository.findByTitleContainingIgnoreCase(keyword);
//        }
//
//        return posts.stream()
//                .map(PostResponseDto::new)
//                .collect(Collectors.toList());
//    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> searchPosts(String type, String keyword) {

        List<PostDocument> searchResults;
        if ("titleContent".equals(type)) {
            searchResults = postSearchRepository.findByTitleOrContent(keyword, keyword);
        } else if ("writer".equals(type)) {
            searchResults = postSearchRepository.findByWriter(keyword);
        } else {
            searchResults = postSearchRepository.findByTitle(keyword);
        }

        return searchResults.stream()
                .map(PostResponseDto::new)
                .collect(Collectors.toList());
    }


    // 엘라스틱 서치 - 자동완성 로직
    @Transactional(readOnly = true)
    public List<String> getAutocompleteKeywords(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return List.of();   // '키워드' null -> null 리스트 반환하게
        }

        // 엘라스틱서치에서 (키워드로 시작)하는 문서 검색하기
        List<PostDocument> documents = postSearchRepository.autocompleteTitle(keyword);

        // 제목 추출 -> 중복을 제거 -> 5개 제한
        return documents.stream()
                .map(PostDocument::getTitle)
                .distinct()
                .limit(5)
                .collect(Collectors.toList());
    }

}