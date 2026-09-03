package com.dishcount.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "comparisons")
public class Comparison {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    private Restaurant restaurant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dish_id", nullable = false)
    private Dish dish;

    private String location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "best_platform_id")
    private Platform bestPlatform;

    private BigDecimal lowestPrice;

    private BigDecimal maximumSavings;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Comparison() {}

    public Comparison(Long id, Restaurant restaurant, Dish dish, String location, Platform bestPlatform, BigDecimal lowestPrice, BigDecimal maximumSavings, LocalDateTime createdAt) {
        this.id = id;
        this.restaurant = restaurant;
        this.dish = dish;
        this.location = location;
        this.bestPlatform = bestPlatform;
        this.lowestPrice = lowestPrice;
        this.maximumSavings = maximumSavings;
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    public static Builder builder() { return new Builder(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Restaurant getRestaurant() { return restaurant; }
    public void setRestaurant(Restaurant restaurant) { this.restaurant = restaurant; }

    public Dish getDish() { return dish; }
    public void setDish(Dish dish) { this.dish = dish; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Platform getBestPlatform() { return bestPlatform; }
    public void setBestPlatform(Platform bestPlatform) { this.bestPlatform = bestPlatform; }

    public BigDecimal getLowestPrice() { return lowestPrice; }
    public void setLowestPrice(BigDecimal lowestPrice) { this.lowestPrice = lowestPrice; }

    public BigDecimal getMaximumSavings() { return maximumSavings; }
    public void setMaximumSavings(BigDecimal maximumSavings) { this.maximumSavings = maximumSavings; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static class Builder {
        private Long id;
        private Restaurant restaurant;
        private Dish dish;
        private String location;
        private Platform bestPlatform;
        private BigDecimal lowestPrice;
        private BigDecimal maximumSavings;
        private LocalDateTime createdAt = LocalDateTime.now();

        public Builder id(Long id) { this.id = id; return this; }
        public Builder restaurant(Restaurant restaurant) { this.restaurant = restaurant; return this; }
        public Builder dish(Dish dish) { this.dish = dish; return this; }
        public Builder location(String location) { this.location = location; return this; }
        public Builder bestPlatform(Platform bestPlatform) { this.bestPlatform = bestPlatform; return this; }
        public Builder lowestPrice(BigDecimal lowestPrice) { this.lowestPrice = lowestPrice; return this; }
        public Builder maximumSavings(BigDecimal maximumSavings) { this.maximumSavings = maximumSavings; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Comparison build() {
            return new Comparison(id, restaurant, dish, location, bestPlatform, lowestPrice, maximumSavings, createdAt);
        }
    }
}
