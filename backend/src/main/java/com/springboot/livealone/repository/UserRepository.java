package com.springboot.livealone.repository;

import com.springboot.livealone.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    // 중복 가입 방지용
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);
}
