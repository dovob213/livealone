package com.springboot.livealone.service;

import com.springboot.livealone.dto.request.UserJoinDto;
import com.springboot.livealone.entity.User;
import com.springboot.livealone.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor // Repository를 주입받기 위해 사용
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public Long join(UserJoinDto dto) {
        // 1. DTO -> Entity 변환 (요리하기)
        User user = User.builder()  // dto 내용을 User(엔티티 쓴거)
                .email(dto.getEmail())
                .password(dto.getPassword()) // 원래 여기서 암호화 로직
                .nickname(dto.getNickname())
                .university(dto.getUniversity())
                .role("USER")
                .build();

        // 2. Repository를 통해 DB 저장 (창고에 넣기)
        User savedUser = userRepository.save(user);

        return savedUser.getId();
    }
}