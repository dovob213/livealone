package com.springboot.livealone.dto.response;

import com.springboot.livealone.entity.Comment;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
public class CommentResponseDto {
    private Long id;
    private String content;
    private String writer;
    private LocalDateTime createdDate;

    public CommentResponseDto(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.writer = comment.getUser().getNickname();
        this.createdDate = comment.getCreatedDate();
    }
}