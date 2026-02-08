package com.springboot.livealone.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "room_trades")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RoomTrade {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String title;

    private Integer price;
    private String location;

    @Builder.Default
    private String status = "RECRUITING"; // 기본값 설정
}