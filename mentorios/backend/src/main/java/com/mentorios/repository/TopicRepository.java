package com.mentorios.repository;

import com.mentorios.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {
    List<Topic> findByCourseId(Long courseId);
    List<Topic> findByParentTopicId(Long parentTopicId);
}
