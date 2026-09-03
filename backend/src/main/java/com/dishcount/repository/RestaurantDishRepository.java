package com.dishcount.repository;

import com.dishcount.entity.RestaurantDish;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface RestaurantDishRepository extends JpaRepository<RestaurantDish, Long> {
    Optional<RestaurantDish> findByRestaurantIdAndDishId(Long restaurantId, Long dishId);
    List<RestaurantDish> findByRestaurantId(Long restaurantId);
}
