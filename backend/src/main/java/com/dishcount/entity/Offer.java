package com.dishcount.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "offers")
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "platform_id", nullable = false)
    private Platform platform;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dish_id")
    private Dish dish;

    @Column(nullable = false)
    private String title;

    private String description;

    private String couponCode;

    private String discountType;

    private BigDecimal discountValue;

    private BigDecimal minimumOrder;

    private LocalDateTime expiryDate;

    public Offer() {}

    public Offer(Long id, Platform platform, Restaurant restaurant, Dish dish, String title, String description, String couponCode, String discountType, BigDecimal discountValue, BigDecimal minimumOrder, LocalDateTime expiryDate) {
        this.id = id;
        this.platform = platform;
        this.restaurant = restaurant;
        this.dish = dish;
        this.title = title;
        this.description = description;
        this.couponCode = couponCode;
        this.discountType = discountType;
        this.discountValue = discountValue;
        this.minimumOrder = minimumOrder;
        this.expiryDate = expiryDate;
    }

    public static Builder builder() { return new Builder(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Platform getPlatform() { return platform; }
    public void setPlatform(Platform platform) { this.platform = platform; }

    public Restaurant getRestaurant() { return restaurant; }
    public void setRestaurant(Restaurant restaurant) { this.restaurant = restaurant; }

    public Dish getDish() { return dish; }
    public void setDish(Dish dish) { this.dish = dish; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCouponCode() { return couponCode; }
    public void setCouponCode(String couponCode) { this.couponCode = couponCode; }

    public String getDiscountType() { return discountType; }
    public void setDiscountType(String discountType) { this.discountType = discountType; }

    public BigDecimal getDiscountValue() { return discountValue; }
    public void setDiscountValue(BigDecimal discountValue) { this.discountValue = discountValue; }

    public BigDecimal getMinimumOrder() { return minimumOrder; }
    public void setMinimumOrder(BigDecimal minimumOrder) { this.minimumOrder = minimumOrder; }

    public LocalDateTime getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDateTime expiryDate) { this.expiryDate = expiryDate; }

    public static class Builder {
        private Long id;
        private Platform platform;
        private Restaurant restaurant;
        private Dish dish;
        private String title;
        private String description;
        private String couponCode;
        private String discountType;
        private BigDecimal discountValue;
        private BigDecimal minimumOrder;
        private LocalDateTime expiryDate;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder platform(Platform platform) { this.platform = platform; return this; }
        public Builder restaurant(Restaurant restaurant) { this.restaurant = restaurant; return this; }
        public Builder dish(Dish dish) { this.dish = dish; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder couponCode(String couponCode) { this.couponCode = couponCode; return this; }
        public Builder discountType(String discountType) { this.discountType = discountType; return this; }
        public Builder discountValue(BigDecimal discountValue) { this.discountValue = discountValue; return this; }
        public Builder minimumOrder(BigDecimal minimumOrder) { this.minimumOrder = minimumOrder; return this; }
        public Builder expiryDate(LocalDateTime expiryDate) { this.expiryDate = expiryDate; return this; }

        public Offer build() {
            return new Offer(id, platform, restaurant, dish, title, description, couponCode, discountType, discountValue, minimumOrder, expiryDate);
        }
    }
}
