package com.springboot.livealone.dto.response;

import com.springboot.livealone.entity.Post;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class PostResponseDto {
    private Long id;
    private String title;
    private String content;
    private String writer; // 작성자닉
    private LocalDateTime createdDate;

    // 엔티티(Post)를 받아서 DTO로 변환, 생성자
    public PostResponseDto(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.writer = post.getUser().getNickname(); // 유저 테이블에서 닉 꺼내오기
        this.createdDate = post.getCreatedDate();
    }
}