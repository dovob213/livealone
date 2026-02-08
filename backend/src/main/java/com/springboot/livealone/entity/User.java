package com.springboot.livealone.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity // 이 클래스는 DB 테이블과 1:1로 매칭됨을 선언
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // JPA를 위한 기본 생성자
@AllArgsConstructor
@Builder
public class User {
    @Id // 기본키 설정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // DB의 IDENTITY(Auto Increment) 사용
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, length = 50)
    private String nickname;

    private String university;

    @Column(nullable = false)
    private String role;
}
