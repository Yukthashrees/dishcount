package com.dishcount.repository;

import com.dishcount.entity.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OfferRepository extends JpaRepository<Offer, Long> {
    List<Offer> findByPlatformId(Long platformId);
    List<Offer> findByRestaurantId(Long restaurantId);
}
