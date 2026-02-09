package com.springboot.livealone.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class PostCreateDto {
    private String title;   // 프론트에서 제목, 내용만 보낼 거라 가정.. 작성자는 토큰에 들어있으니까
    private String content;
}