package com.dishcount.repository;

import com.dishcount.entity.PriceHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;

public interface PriceHistoryRepository extends JpaRepository<PriceHistory, Long> {
    
    @Query("SELECT ph FROM PriceHistory ph WHERE ph.restaurantDish.dish.id = :dishId AND ph.recordedAt >= :fromDate ORDER BY ph.recordedAt ASC")
    List<PriceHistory> findByDishIdAndRecordedAtAfter(@Param("dishId") Long dishId, @Param("fromDate") LocalDateTime fromDate);
}
