package com.springboot.livealone.repository;

import com.springboot.livealone.entity.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest // 스프링 컨텍스트 전체 로딩 (DB 연결 포함)
@Transactional  // 테스트 끝나면 데이터 롤백 (DB 깔끔하게 유지)
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    @DisplayName("회원가입_성공_테스트")
    void saveUserTest() {
        // 1. Given (준비)
        User user = User.builder()
                .email("chanyoung@test.com")
                .password("1234") // 나중에 암호화
                .nickname("정찬영")
                .university("충남대")
                .role("USER")
                .build();

        // 2. When (실행)
        User savedUser = userRepository.save(user);

        // 3. Then (검증)
        assertThat(savedUser.getId()).isNotNull(); // ID가 생겼는지 여부
        assertThat(savedUser.getEmail()).isEqualTo("test@test.com"); // 이메일이 맞는지

        System.out.println("[테스트] 생성된 유저의 ID: " + savedUser.getId());
    }
}