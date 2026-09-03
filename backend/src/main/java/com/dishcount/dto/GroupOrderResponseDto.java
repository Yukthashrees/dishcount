package com.dishcount.dto;

import java.math.BigDecimal;
import java.util.List;

public class GroupOrderResponseDto {

    private String restaurantName;
    private Integer totalItemCount;
    private List<PlatformGroupTotalDto> platformTotals;
    private String bestPlatform;
    private BigDecimal totalSavings;

    public GroupOrderResponseDto() {}

    public GroupOrderResponseDto(String restaurantName, Integer totalItemCount, List<PlatformGroupTotalDto> platformTotals, String bestPlatform, BigDecimal totalSavings) {
        this.restaurantName = restaurantName;
        this.totalItemCount = totalItemCount;
        this.platformTotals = platformTotals;
        this.bestPlatform = bestPlatform;
        this.totalSavings = totalSavings;
    }

    public static Builder builder() { return new Builder(); }

    public String getRestaurantName() { return restaurantName; }
    public void setRestaurantName(String restaurantName) { this.restaurantName = restaurantName; }

    public Integer getTotalItemCount() { return totalItemCount; }
    public void setTotalItemCount(Integer totalItemCount) { this.totalItemCount = totalItemCount; }

    public List<PlatformGroupTotalDto> getPlatformTotals() { return platformTotals; }
    public void setPlatformTotals(List<PlatformGroupTotalDto> platformTotals) { this.platformTotals = platformTotals; }

    public String getBestPlatform() { return bestPlatform; }
    public void setBestPlatform(String bestPlatform) { this.bestPlatform = bestPlatform; }

    public BigDecimal getTotalSavings() { return totalSavings; }
    public void setTotalSavings(BigDecimal totalSavings) { this.totalSavings = totalSavings; }

    public static class PlatformGroupTotalDto {
        private String platformId;
        private String platformName;
        private BigDecimal subtotal;
        private BigDecimal deliveryFee;
        private BigDecimal platformFee;
        private BigDecimal packagingFee;
        private BigDecimal tax;
        private BigDecimal discount;
        private BigDecimal finalPrice;
        private Boolean isBestDeal;

        public PlatformGroupTotalDto() {}

        public PlatformGroupTotalDto(String platformId, String platformName, BigDecimal subtotal, BigDecimal deliveryFee, BigDecimal platformFee, BigDecimal packagingFee, BigDecimal tax, BigDecimal discount, BigDecimal finalPrice, Boolean isBestDeal) {
            this.platformId = platformId;
            this.platformName = platformName;
            this.subtotal = subtotal;
            this.deliveryFee = deliveryFee;
            this.platformFee = platformFee;
            this.packagingFee = packagingFee;
            this.tax = tax;
            this.discount = discount;
            this.finalPrice = finalPrice;
            this.isBestDeal = isBestDeal;
        }

        public static PlatformGroupTotalDtoBuilder builder() { return new PlatformGroupTotalDtoBuilder(); }

        public String getPlatformId() { return platformId; }
        public void setPlatformId(String platformId) { this.platformId = platformId; }

        public String getPlatformName() { return platformName; }
        public void setPlatformName(String platformName) { this.platformName = platformName; }

        public BigDecimal getSubtotal() { return subtotal; }
        public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }

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

        public Boolean getIsBestDeal() { return isBestDeal; }
        public void setIsBestDeal(Boolean isBestDeal) { this.isBestDeal = isBestDeal; }

        public static class PlatformGroupTotalDtoBuilder {
            private String platformId;
            private String platformName;
            private BigDecimal subtotal;
            private BigDecimal deliveryFee;
            private BigDecimal platformFee;
            private BigDecimal packagingFee;
            private BigDecimal tax;
            private BigDecimal discount;
            private BigDecimal finalPrice;
            private Boolean isBestDeal;

            public PlatformGroupTotalDtoBuilder platformId(String platformId) { this.platformId = platformId; return this; }
            public PlatformGroupTotalDtoBuilder platformName(String platformName) { this.platformName = platformName; return this; }
            public PlatformGroupTotalDtoBuilder subtotal(BigDecimal subtotal) { this.subtotal = subtotal; return this; }
            public PlatformGroupTotalDtoBuilder deliveryFee(BigDecimal deliveryFee) { this.deliveryFee = deliveryFee; return this; }
            public PlatformGroupTotalDtoBuilder platformFee(BigDecimal platformFee) { this.platformFee = platformFee; return this; }
            public PlatformGroupTotalDtoBuilder packagingFee(BigDecimal packagingFee) { this.packagingFee = packagingFee; return this; }
            public PlatformGroupTotalDtoBuilder tax(BigDecimal tax) { this.tax = tax; return this; }
            public PlatformGroupTotalDtoBuilder discount(BigDecimal discount) { this.discount = discount; return this; }
            public PlatformGroupTotalDtoBuilder finalPrice(BigDecimal finalPrice) { this.finalPrice = finalPrice; return this; }
            public PlatformGroupTotalDtoBuilder isBestDeal(Boolean isBestDeal) { this.isBestDeal = isBestDeal; return this; }

            public PlatformGroupTotalDto build() {
                return new PlatformGroupTotalDto(platformId, platformName, subtotal, deliveryFee, platformFee, packagingFee, tax, discount, finalPrice, isBestDeal);
            }
        }
    }

    public static class Builder {
        private String restaurantName;
        private Integer totalItemCount;
        private List<PlatformGroupTotalDto> platformTotals;
        private String bestPlatform;
        private BigDecimal totalSavings;

        public Builder restaurantName(String restaurantName) { this.restaurantName = restaurantName; return this; }
        public Builder totalItemCount(Integer totalItemCount) { this.totalItemCount = totalItemCount; return this; }
        public Builder platformTotals(List<PlatformGroupTotalDto> platformTotals) { this.platformTotals = platformTotals; return this; }
        public Builder bestPlatform(String bestPlatform) { this.bestPlatform = bestPlatform; return this; }
        public Builder totalSavings(BigDecimal totalSavings) { this.totalSavings = totalSavings; return this; }

        public GroupOrderResponseDto build() {
            return new GroupOrderResponseDto(restaurantName, totalItemCount, platformTotals, bestPlatform, totalSavings);
        }
    }
}
