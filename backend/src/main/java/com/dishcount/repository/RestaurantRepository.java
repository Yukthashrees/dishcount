package com.dishcount.repository;

import com.dishcount.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    
    List<Restaurant> findByNameContainingIgnoreCaseOrCuisineContainingIgnoreCase(String name, String cuisine);

    @Query("SELECT DISTINCT r FROM Restaurant r JOIN RestaurantMood rm ON r.id = rm.restaurant.id JOIN rm.mood m WHERE LOWER(m.name) = LOWER(:moodName)")
    List<Restaurant> findByMoodName(@Param("moodName") String moodName);
}
