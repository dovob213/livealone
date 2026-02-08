package com.springboot.livealone.service;

import com.springboot.livealone.dto.request.UserJoinDto;
import com.springboot.livealone.entity.User;
import com.springboot.livealone.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.livealone.config.jwt.JwtTokenProvider;
import com.springboot.livealone.dto.request.LoginDto;

@Service
@RequiredArgsConstructor // Repository를 주입받기 위해 사용
@Transactional
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder; // 비밀번호 그대로저장 안하고 암호화하기. 기계 가져오기.
    private final JwtTokenProvider jwtTokenProvider;

    public Long join(UserJoinDto dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("이미 존재하는 이메일입니다.");
        }

        // ★ 비밀번호 암호화 실행
        String encodedPassword = passwordEncoder.encode(dto.getPassword());

        User user = User.builder()
                .email(dto.getEmail())
                .password(encodedPassword) // 암호화된 비번 저장!
                .nickname(dto.getNickname())
                .university(dto.getUniversity())
                .role("USER")
                .build();

        return userRepository.save(user).getId();
    }

    public String login(LoginDto dto) {
        // 1. 이메일로 유저 찾기
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("가입되지 않은 이메일입니다."));

        // 2. 비밀번호 일치 여부 확인 (사용자가 친 비번 vs DB에 저장된 암호화된 비번)
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        // 3. 로그인이 성공하면 토큰을 생성해서 반환
        return jwtTokenProvider.createAccessToken(user.getId(), user.getEmail(), user.getRole());
    }
}