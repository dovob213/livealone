package com.springboot.livealone.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "group_buys")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class GroupBuy {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; // 방장. 주최하는사람

    @Column(name = "item_name", nullable = false)
    private String itemName;

    @Column(name = "target_count", nullable = false)
    private Integer targetCount;

    @Builder.Default
    @Column(name = "current_count")
    private Integer currentCount = 1;

    private LocalDateTime deadline;
}