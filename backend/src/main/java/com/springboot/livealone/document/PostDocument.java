package com.springboot.livealone.document;

import org.springframework.data.annotation.Id; // javax.persistence.Id 아님
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Document(indexName = "posts") // 엘라스틱서치 내부에 인덱스 만들기
public class PostDocument {
    @Id
    private Long id;

    @Field(type = FieldType.Text) // 단어 쪼개서 검색 (형태소)
    private String title;

    @Field(type = FieldType.Text)
    private String content;

    @Field(type = FieldType.Keyword) // 'Keyword' -> 작성자명은 아예 일치하게 하기
    private String writer;
}