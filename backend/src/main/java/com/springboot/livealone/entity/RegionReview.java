package com.springboot.livealone.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "region_reviews")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RegionReview {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "region_name", length = 100)
    private String regionName;

    private Integer rating; //1~5로 제한하자

    @Column(columnDefinition = "TEXT")
    private String content;
}