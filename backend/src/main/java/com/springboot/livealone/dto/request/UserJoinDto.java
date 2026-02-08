package com.springboot.livealone.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserJoinDto {
    // 회원가입할 때 사용자에게 딱 이것만 받을 거야!
    private String email;
    private String password;
    private String nickname;
    private String university;
}