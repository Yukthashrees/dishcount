package com.dishcount.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "price_history", indexes = {
    @Index(name = "idx_ph_recorded_at", columnList = "recordedAt")
})
public class PriceHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_dish_id", nullable = false)
    private RestaurantDish restaurantDish;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "platform_id", nullable = false)
    private Platform platform;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private LocalDateTime recordedAt;

    public PriceHistory() {}

    public PriceHistory(Long id, RestaurantDish restaurantDish, Platform platform, BigDecimal price, LocalDateTime recordedAt) {
        this.id = id;
        this.restaurantDish = restaurantDish;
        this.platform = platform;
        this.price = price;
        this.recordedAt = recordedAt;
    }

    public static Builder builder() { return new Builder(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public RestaurantDish getRestaurantDish() { return restaurantDish; }
    public void setRestaurantDish(RestaurantDish restaurantDish) { this.restaurantDish = restaurantDish; }

    public Platform getPlatform() { return platform; }
    public void setPlatform(Platform platform) { this.platform = platform; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public LocalDateTime getRecordedAt() { return recordedAt; }
    public void setRecordedAt(LocalDateTime recordedAt) { this.recordedAt = recordedAt; }

    public static class Builder {
        private Long id;
        private RestaurantDish restaurantDish;
        private Platform platform;
        private BigDecimal price;
        private LocalDateTime recordedAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder restaurantDish(RestaurantDish restaurantDish) { this.restaurantDish = restaurantDish; return this; }
        public Builder platform(Platform platform) { this.platform = platform; return this; }
        public Builder price(BigDecimal price) { this.price = price; return this; }
        public Builder recordedAt(LocalDateTime recordedAt) { this.recordedAt = recordedAt; return this; }

        public PriceHistory build() {
            return new PriceHistory(id, restaurantDish, platform, price, recordedAt);
        }
    }
}
