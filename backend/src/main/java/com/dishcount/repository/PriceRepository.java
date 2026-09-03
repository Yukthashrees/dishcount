package com.dishcount.repository;

import com.dishcount.entity.Price;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PriceRepository extends JpaRepository<Price, Long> {
    List<Price> findByRestaurantDishId(Long restaurantDishId);
    Optional<Price> findByRestaurantDishIdAndPlatformId(Long restaurantDishId, Long platformId);
}
