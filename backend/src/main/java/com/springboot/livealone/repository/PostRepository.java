package com.springboot.livealone.repository;

import com.springboot.livealone.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    // 저장, 조회는 JpaRepository에 기본으로
    List<Post> findByTitleContainingIgnoreCase(String title);

    List<Post> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(String titleKeyword, String contentKeyword);

    List<Post> findByUserNicknameContainingIgnoreCase(String nickname);

}