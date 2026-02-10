package com.springboot.livealone.repository;

import com.springboot.livealone.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    // SQL: SELECT * FROM comments WHERE post_id = ?
    List<Comment> findByPostId(Long postId);
}