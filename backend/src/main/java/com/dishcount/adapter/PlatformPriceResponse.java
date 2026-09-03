package com.dishcount.adapter;

import java.math.BigDecimal;

public class PlatformPriceResponse {

    private String platformId;
    private String platformName;
    private BigDecimal itemPrice;
    private BigDecimal deliveryFee;
    private BigDecimal platformFee;
    private BigDecimal packagingFee;
    private BigDecimal tax;
    private BigDecimal discount;
    private BigDecimal finalPrice;
    private Integer deliveryTime;
    private Boolean available;
    private String couponCode;
    private String scoreReason;
    private String deepLink;
    private String logoUrl;

    public PlatformPriceResponse() {}

    public PlatformPriceResponse(String platformId, String platformName, BigDecimal itemPrice, BigDecimal deliveryFee, BigDecimal platformFee, BigDecimal packagingFee, BigDecimal tax, BigDecimal discount, BigDecimal finalPrice, Integer deliveryTime, Boolean available, String couponCode, String scoreReason, String deepLink, String logoUrl) {
        this.platformId = platformId;
        this.platformName = platformName;
        this.itemPrice = itemPrice;
        this.deliveryFee = deliveryFee;
        this.platformFee = platformFee;
        this.packagingFee = packagingFee;
        this.tax = tax;
        this.discount = discount;
        this.finalPrice = finalPrice;
        this.deliveryTime = deliveryTime;
        this.available = available;
        this.couponCode = couponCode;
        this.scoreReason = scoreReason;
        this.deepLink = deepLink;
        this.logoUrl = logoUrl;
    }

    public static Builder builder() { return new Builder(); }

    public String getPlatformId() { return platformId; }
    public void setPlatformId(String platformId) { this.platformId = platformId; }

    public String getPlatformName() { return platformName; }
    public void setPlatformName(String platformName) { this.platformName = platformName; }

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

    public String getDeepLink() { return deepLink; }
    public void setDeepLink(String deepLink) { this.deepLink = deepLink; }

    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }

    public static class Builder {
        private String platformId;
        private String platformName;
        private BigDecimal itemPrice;
        private BigDecimal deliveryFee;
        private BigDecimal platformFee;
        private BigDecimal packagingFee;
        private BigDecimal tax;
        private BigDecimal discount;
        private BigDecimal finalPrice;
        private Integer deliveryTime;
        private Boolean available;
        private String couponCode;
        private String scoreReason;
        private String deepLink;
        private String logoUrl;

        public Builder platformId(String platformId) { this.platformId = platformId; return this; }
        public Builder platformName(String platformName) { this.platformName = platformName; return this; }
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
        public Builder deepLink(String deepLink) { this.deepLink = deepLink; return this; }
        public Builder logoUrl(String logoUrl) { this.logoUrl = logoUrl; return this; }

        public PlatformPriceResponse build() {
            return new PlatformPriceResponse(platformId, platformName, itemPrice, deliveryFee, platformFee, packagingFee, tax, discount, finalPrice, deliveryTime, available, couponCode, scoreReason, deepLink, logoUrl);
        }
    }
}
