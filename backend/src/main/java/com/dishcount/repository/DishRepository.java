package com.dishcount.repository;

import com.dishcount.entity.Dish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface DishRepository extends JpaRepository<Dish, Long> {
    
    List<Dish> findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(String name, String category);

    @Query("SELECT rd.dish FROM RestaurantDish rd WHERE rd.restaurant.id = :restaurantId AND rd.available = true")
    List<Dish> findDishesByRestaurantId(@Param("restaurantId") Long restaurantId);
}
