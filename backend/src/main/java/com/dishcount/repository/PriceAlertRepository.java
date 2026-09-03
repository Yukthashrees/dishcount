package com.dishcount.repository;

import com.dishcount.entity.PriceAlert;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PriceAlertRepository extends JpaRepository<PriceAlert, Long> {
    List<PriceAlert> findByUserId(Long userId);
    void deleteByUserIdAndId(Long userId, Long id);
}
