package com.dishcount.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "prices", indexes = {
    @Index(name = "idx_price_platform", columnList = "platform_id"),
    @Index(name = "idx_price_rd", columnList = "restaurant_dish_id"),
    @Index(name = "idx_price_last_updated", columnList = "lastUpdated")
})
public class Price {

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
    private BigDecimal itemPrice;

    @Column(nullable = false)
    private BigDecimal deliveryFee;

    @Column(nullable = false)
    private BigDecimal platformFee;

    @Column(nullable = false)
    private BigDecimal packagingFee;

    @Column(nullable = false)
    private BigDecimal tax;

    @Column(nullable = false)
    private BigDecimal discount;

    @Column(nullable = false)
    private BigDecimal finalPrice;

    private Integer deliveryTime;

    private Boolean available = true;

    private String couponCode;

    private String scoreReason;

    private LocalDateTime lastUpdated = LocalDateTime.now();

    public Price() {}

    public Price(Long id, RestaurantDish restaurantDish, Platform platform, BigDecimal itemPrice, BigDecimal deliveryFee, BigDecimal platformFee, BigDecimal packagingFee, BigDecimal tax, BigDecimal discount, BigDecimal finalPrice, Integer deliveryTime, Boolean available, String couponCode, String scoreReason, LocalDateTime lastUpdated) {
        this.id = id;
        this.restaurantDish = restaurantDish;
        this.platform = platform;
        this.itemPrice = itemPrice;
        this.deliveryFee = deliveryFee;
        this.platformFee = platformFee;
        this.packagingFee = packagingFee;
        this.tax = tax;
        this.discount = discount;
        this.finalPrice = finalPrice;
        this.deliveryTime = deliveryTime;
        this.available = available != null ? available : true;
        this.couponCode = couponCode;
        this.scoreReason = scoreReason;
        this.lastUpdated = lastUpdated != null ? lastUpdated : LocalDateTime.now();
    }

    public static Builder builder() { return new Builder(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public RestaurantDish getRestaurantDish() { return restaurantDish; }
    public void setRestaurantDish(RestaurantDish restaurantDish) { this.restaurantDish = restaurantDish; }

    public Platform getPlatform() { return platform; }
    public void setPlatform(Platform platform) { this.platform = platform; }

    public BigDecimal getItemPrice() { return itemPrice; }
    public void setItemPrice(BigDecimal itemPrice) { this.itemPrice = itemPrice; }

    public BigDecimal getDeliveryFee() { return deliveryFee; }
    public void setDeliveryFee(BigDecimal deliveryFee) { this.deliveryFee = deliveryFee; }

    public BigDecimal getPlatformFee() { return platformFee; }
    public void setPlatformFee(BigDecimal platformFee) { this.platformFee = platformFee; }

    public BigDecimal getPackagingFee() { return packagingFee; }
    public void setPackagingFee(BigDecimal packagingFee) { this.packagingFee = packagingFee; }

    public BigDecimal getTax() { return tax; }
    public void setTax(BigDecimal tax) { this.tax = tax; }

    public BigDecimal getDiscount() { return discount; }
    public void setDiscount(BigDecimal discount) { this.discount = discount; }

    public BigDecimal getFinalPrice() { return finalPrice; }
    public void setFinalPrice(BigDecimal finalPrice) { this.finalPrice = finalPrice; }

    public Integer getDeliveryTime() { return deliveryTime; }
    public void setDeliveryTime(Integer deliveryTime) { this.deliveryTime = deliveryTime; }

    public Boolean getAvailable() { return available; }
    public void setAvailable(Boolean available) { this.available = available; }

    public String getCouponCode() { return couponCode; }
    public void setCouponCode(String couponCode) { this.couponCode = couponCode; }

    public String getScoreReason() { return scoreReason; }
    public void setScoreReason(String scoreReason) { this.scoreReason = scoreReason; }

    public LocalDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; }

    public static class Builder {
        private Long id;
        private RestaurantDish restaurantDish;
        private Platform platform;
        private BigDecimal itemPrice;
        private BigDecimal deliveryFee;
        private BigDecimal platformFee;
        private BigDecimal packagingFee;
        private BigDecimal tax;
        private BigDecimal discount;
        private BigDecimal finalPrice;
        private Integer deliveryTime;
        private Boolean available = true;
        private String couponCode;
        private String scoreReason;
        private LocalDateTime lastUpdated = LocalDateTime.now();

        public Builder id(Long id) { this.id = id; return this; }
        public Builder restaurantDish(RestaurantDish restaurantDish) { this.restaurantDish = restaurantDish; return this; }
        public Builder platform(Platform platform) { this.platform = platform; return this; }
        public Builder itemPrice(BigDecimal itemPrice) { this.itemPrice = itemPrice; return this; }
        public Builder deliveryFee(BigDecimal deliveryFee) { this.deliveryFee = deliveryFee; return this; }
        public Builder platformFee(BigDecimal platformFee) { this.platformFee = platformFee; return this; }
        public Builder packagingFee(BigDecimal packagingFee) { this.packagingFee = packagingFee; return this; }
        public Builder tax(BigDecimal tax) { this.tax = tax; return this; }
        public Builder discount(BigDecimal discount) { this.discount = discount; return this; }
        public Builder finalPrice(BigDecimal finalPrice) { this.finalPrice = finalPrice; return this; }
        public Builder deliveryTime(Integer deliveryTime) { this.deliveryTime = deliveryTime; return this; }
        public Builder available(Boolean available) { this.available = available; return this; }
        public Builder couponCode(String couponCode) { this.couponCode = couponCode; return this; }
        public Builder scoreReason(String scoreReason) { this.scoreReason = scoreReason; return this; }
        public Builder lastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; return this; }

        public Price build() {
            return new Price(id, restaurantDish, platform, itemPrice, deliveryFee, platformFee, packagingFee, tax, discount, finalPrice, deliveryTime, available, couponCode, scoreReason, lastUpdated);
        }
    }
}
