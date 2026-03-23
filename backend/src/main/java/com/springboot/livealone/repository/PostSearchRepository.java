package com.springboot.livealone.repository;

import com.springboot.livealone.document.PostDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

import org.springframework.data.elasticsearch.annotations.Query;

// JpaRepository 대신 ElasticsearchRepository 상속받기
public interface PostSearchRepository extends ElasticsearchRepository<PostDocument, Long> {
    List<PostDocument> findByTitle(String title);

    List<PostDocument> findByTitleOrContent(String title, String content);

    List<PostDocument> findByWriter(String writer);

    @Query("{\"match_phrase_prefix\": {\"title\": \"?0\"}}")
    List<PostDocument> autocompleteTitle(String keyword);
}
