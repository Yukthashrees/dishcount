package com.dishcount.dto;

import java.math.BigDecimal;

public class PlatformPriceBreakdownDto {

    private String platformId;
    private String platformName;
    private BigDecimal basePrice;
    private BigDecimal itemPrice;
    private BigDecimal deliveryFee;
    private BigDecimal platformFee;
    private BigDecimal packagingFee;
    private BigDecimal taxes;
    private BigDecimal discount;
    private BigDecimal restaurantDiscount;
    private BigDecimal couponDiscount;
    private BigDecimal finalPayablePrice;
    private Integer deliveryTimeMinutes;
    private Boolean available;
    private String couponCode;
    private String scoreReason;
    private String deepLink;
    private String logoUrl;
    private Boolean isBestDeal;
    private BigDecimal savingsVsHighest;

    public PlatformPriceBreakdownDto() {}

    public PlatformPriceBreakdownDto(String platformId, String platformName, BigDecimal basePrice, BigDecimal itemPrice, BigDecimal deliveryFee, BigDecimal platformFee, BigDecimal packagingFee, BigDecimal taxes, BigDecimal discount, BigDecimal restaurantDiscount, BigDecimal couponDiscount, BigDecimal finalPayablePrice, Integer deliveryTimeMinutes, Boolean available, String couponCode, String scoreReason, String deepLink, String logoUrl, Boolean isBestDeal, BigDecimal savingsVsHighest) {
        this.platformId = platformId;
        this.platformName = platformName;
        this.basePrice = basePrice;
        this.itemPrice = itemPrice;
        this.deliveryFee = deliveryFee;
        this.platformFee = platformFee;
        this.packagingFee = packagingFee;
        this.taxes = taxes;
        this.discount = discount;
        this.restaurantDiscount = restaurantDiscount;
        this.couponDiscount = couponDiscount;
        this.finalPayablePrice = finalPayablePrice;
        this.deliveryTimeMinutes = deliveryTimeMinutes;
        this.available = available;
        this.couponCode = couponCode;
        this.scoreReason = scoreReason;
        this.deepLink = deepLink;
        this.logoUrl = logoUrl;
        this.isBestDeal = isBestDeal;
        this.savingsVsHighest = savingsVsHighest;
    }

    public static Builder builder() { return new Builder(); }

    public String getPlatformId() { return platformId; }
    public void setPlatformId(String platformId) { this.platformId = platformId; }

    public String getPlatformName() { return platformName; }
    public void setPlatformName(String platformName) { this.platformName = platformName; }

    public BigDecimal getBasePrice() { return basePrice; }
    public void setBasePrice(BigDecimal basePrice) { this.basePrice = basePrice; }

    public BigDecimal getItemPrice() { return itemPrice; }
    public void setItemPrice(BigDecimal itemPrice) { this.itemPrice = itemPrice; }

    public BigDecimal getDeliveryFee() { return deliveryFee; }
    public void setDeliveryFee(BigDecimal deliveryFee) { this.deliveryFee = deliveryFee; }

    public BigDecimal getPlatformFee() { return platformFee; }
    public void setPlatformFee(BigDecimal platformFee) { this.platformFee = platformFee; }

    public BigDecimal getPackagingFee() { return packagingFee; }
    public void setPackagingFee(BigDecimal packagingFee) { this.packagingFee = packagingFee; }

    public BigDecimal getTaxes() { return taxes; }
    public void setTaxes(BigDecimal taxes) { this.taxes = taxes; }

    public BigDecimal getDiscount() { return discount; }
    public void setDiscount(BigDecimal discount) { this.discount = discount; }

    public BigDecimal getRestaurantDiscount() { return restaurantDiscount; }
    public void setRestaurantDiscount(BigDecimal restaurantDiscount) { this.restaurantDiscount = restaurantDiscount; }

    public BigDecimal getCouponDiscount() { return couponDiscount; }
    public void setCouponDiscount(BigDecimal couponDiscount) { this.couponDiscount = couponDiscount; }

    public BigDecimal getFinalPayablePrice() { return finalPayablePrice; }
    public void setFinalPayablePrice(BigDecimal finalPayablePrice) { this.finalPayablePrice = finalPayablePrice; }

    public Integer getDeliveryTimeMinutes() { return deliveryTimeMinutes; }
    public void setDeliveryTimeMinutes(Integer deliveryTimeMinutes) { this.deliveryTimeMinutes = deliveryTimeMinutes; }

    public Boolean getAvailable() { return available; }
    public void setAvailable(Boolean available) { this.available = available; }

    public String getCouponCode() { return couponCode; }
    public void setCouponCode(String couponCode) { this.couponCode = couponCode; }

    public String getScoreReason() { return scoreReason; }
    public void setScoreReason(String scoreReason) { this.scoreReason = scoreReason; }

    public String getDeepLink() { return deepLink; }
    public void setDeepLink(String deepLink) { this.deepLink = deepLink; }

    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }

    public Boolean getIsBestDeal() { return isBestDeal; }
    public void setIsBestDeal(Boolean isBestDeal) { this.isBestDeal = isBestDeal; }

    public BigDecimal getSavingsVsHighest() { return savingsVsHighest; }
    public void setSavingsVsHighest(BigDecimal savingsVsHighest) { this.savingsVsHighest = savingsVsHighest; }

    public static class Builder {
        private String platformId;
        private String platformName;
        private BigDecimal basePrice;
        private BigDecimal itemPrice;
        private BigDecimal deliveryFee;
        private BigDecimal platformFee;
        private BigDecimal packagingFee;
        private BigDecimal taxes;
        private BigDecimal discount;
        private BigDecimal restaurantDiscount;
        private BigDecimal couponDiscount;
        private BigDecimal finalPayablePrice;
        private Integer deliveryTimeMinutes;
        private Boolean available;
        private String couponCode;
        private String scoreReason;
        private String deepLink;
        private String logoUrl;
        private Boolean isBestDeal;
        private BigDecimal savingsVsHighest;

        public Builder platformId(String platformId) { this.platformId = platformId; return this; }
        public Builder platformName(String platformName) { this.platformName = platformName; return this; }
        public Builder basePrice(BigDecimal basePrice) { this.basePrice = basePrice; return this; }
        public Builder itemPrice(BigDecimal itemPrice) { this.itemPrice = itemPrice; return this; }
        public Builder deliveryFee(BigDecimal deliveryFee) { this.deliveryFee = deliveryFee; return this; }
        public Builder platformFee(BigDecimal platformFee) { this.platformFee = platformFee; return this; }
        public Builder packagingFee(BigDecimal packagingFee) { this.packagingFee = packagingFee; return this; }
        public Builder taxes(BigDecimal taxes) { this.taxes = taxes; return this; }
        public Builder discount(BigDecimal discount) { this.discount = discount; return this; }
        public Builder restaurantDiscount(BigDecimal restaurantDiscount) { this.restaurantDiscount = restaurantDiscount; return this; }
        public Builder couponDiscount(BigDecimal couponDiscount) { this.couponDiscount = couponDiscount; return this; }
        public Builder finalPayablePrice(BigDecimal finalPayablePrice) { this.finalPayablePrice = finalPayablePrice; return this; }
        public Builder deliveryTimeMinutes(Integer deliveryTimeMinutes) { this.deliveryTimeMinutes = deliveryTimeMinutes; return this; }
        public Builder available(Boolean available) { this.available = available; return this; }
        public Builder couponCode(String couponCode) { this.couponCode = couponCode; return this; }
        public Builder scoreReason(String scoreReason) { this.scoreReason = scoreReason; return this; }
        public Builder deepLink(String deepLink) { this.deepLink = deepLink; return this; }
        public Builder logoUrl(String logoUrl) { this.logoUrl = logoUrl; return this; }
        public Builder isBestDeal(Boolean isBestDeal) { this.isBestDeal = isBestDeal; return this; }
        public Builder savingsVsHighest(BigDecimal savingsVsHighest) { this.savingsVsHighest = savingsVsHighest; return this; }

        public PlatformPriceBreakdownDto build() {
            return new PlatformPriceBreakdownDto(platformId, platformName, basePrice, itemPrice, deliveryFee, platformFee, packagingFee, taxes, discount, restaurantDiscount, couponDiscount, finalPayablePrice, deliveryTimeMinutes, available, couponCode, scoreReason, deepLink, logoUrl, isBestDeal, savingsVsHighest);
        }
    }
}
