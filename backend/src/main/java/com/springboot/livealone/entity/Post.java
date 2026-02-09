package com.springboot.livealone.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name = "community_posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 글 번호 (PK)

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content; // 내용

    // 여러 개의 게시글(M)은 한 명의 유저(1)에 의해 쓰이니까
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id") // DB에 user_id라는 이름으로 저장 (FK)
    private User user; // 작성자. User 객체 자체를 참조

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdDate;

    @Column(length = 50)
    private String category; // "자유", "고민" 등등

    public Post(String title, String content, User user, String category) {
        this.title = title;
        this.content = content;
        this.user = user;
        this.category = category;
    }

    public Post(String title, String content, User user) {
        this.title = title;
        this.content = content;
        this.user = user;
    }
}