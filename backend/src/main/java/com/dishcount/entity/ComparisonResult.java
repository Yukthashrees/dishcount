package com.dishcount.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "comparison_results")
public class ComparisonResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comparison_id", nullable = false)
    private Comparison comparison;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "platform_id", nullable = false)
    private Platform platform;

    private BigDecimal itemPrice;

    private BigDecimal deliveryFee;

    private BigDecimal platformFee;

    private BigDecimal packagingFee;

    private BigDecimal tax;

    private BigDecimal discount;

    private BigDecimal finalPrice;

    private Integer deliveryTime;

    private Boolean available;

    private String deepLink;

    private Boolean isBestDeal;

    private BigDecimal savings;

    public ComparisonResult() {}

    public ComparisonResult(Long id, Comparison comparison, Platform platform, BigDecimal itemPrice, BigDecimal deliveryFee, BigDecimal platformFee, BigDecimal packagingFee, BigDecimal tax, BigDecimal discount, BigDecimal finalPrice, Integer deliveryTime, Boolean available, String deepLink, Boolean isBestDeal, BigDecimal savings) {
        this.id = id;
        this.comparison = comparison;
        this.platform = platform;
        this.itemPrice = itemPrice;
        this.deliveryFee = deliveryFee;
        this.platformFee = platformFee;
        this.packagingFee = packagingFee;
        this.tax = tax;
        this.discount = discount;
        this.finalPrice = finalPrice;
        this.deliveryTime = deliveryTime;
        this.available = available;
        this.deepLink = deepLink;
        this.isBestDeal = isBestDeal;
        this.savings = savings;
    }

    public static Builder builder() { return new Builder(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Comparison getComparison() { return comparison; }
    public void setComparison(Comparison comparison) { this.comparison = comparison; }

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

    public String getDeepLink() { return deepLink; }
    public void setDeepLink(String deepLink) { this.deepLink = deepLink; }

    public Boolean getIsBestDeal() { return isBestDeal; }
    public void setIsBestDeal(Boolean isBestDeal) { this.isBestDeal = isBestDeal; }

    public BigDecimal getSavings() { return savings; }
    public void setSavings(BigDecimal savings) { this.savings = savings; }

    public static class Builder {
        private Long id;
        private Comparison comparison;
        private Platform platform;
        private BigDecimal itemPrice;
        private BigDecimal deliveryFee;
        private BigDecimal platformFee;
        private BigDecimal packagingFee;
        private BigDecimal tax;
        private BigDecimal discount;
        private BigDecimal finalPrice;
        private Integer deliveryTime;
        private Boolean available;
        private String deepLink;
        private Boolean isBestDeal;
        private BigDecimal savings;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder comparison(Comparison comparison) { this.comparison = comparison; return this; }
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
        public Builder deepLink(String deepLink) { this.deepLink = deepLink; return this; }
        public Builder isBestDeal(Boolean isBestDeal) { this.isBestDeal = isBestDeal; return this; }
        public Builder savings(BigDecimal savings) { this.savings = savings; return this; }

        public ComparisonResult build() {
            return new ComparisonResult(id, comparison, platform, itemPrice, deliveryFee, platformFee, packagingFee, tax, discount, finalPrice, deliveryTime, available, deepLink, isBestDeal, savings);
        }
    }
}
