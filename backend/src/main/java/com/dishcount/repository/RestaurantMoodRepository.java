package com.dishcount.repository;

import com.dishcount.entity.RestaurantMood;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RestaurantMoodRepository extends JpaRepository<RestaurantMood, Long> {
    List<RestaurantMood> findByRestaurantId(Long restaurantId);
    List<RestaurantMood> findByMoodId(Long moodId);
}
