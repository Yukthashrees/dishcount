package com.dishcount.dto;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class PriceAlertRequestDto {

    @NotNull
    private Long dishId;

    @NotNull
    private BigDecimal targetPrice;

    public PriceAlertRequestDto() {}

    public PriceAlertRequestDto(Long dishId, BigDecimal targetPrice) {
        this.dishId = dishId;
        this.targetPrice = targetPrice;
    }

    public static Builder builder() { return new Builder(); }

    public Long getDishId() { return dishId; }
    public void setDishId(Long dishId) { this.dishId = dishId; }

    public BigDecimal getTargetPrice() { return targetPrice; }
    public void setTargetPrice(BigDecimal targetPrice) { this.targetPrice = targetPrice; }

    public static class Builder {
        private Long dishId;
        private BigDecimal targetPrice;

        public Builder dishId(Long dishId) { this.dishId = dishId; return this; }
        public Builder targetPrice(BigDecimal targetPrice) { this.targetPrice = targetPrice; return this; }

        public PriceAlertRequestDto build() {
            return new PriceAlertRequestDto(dishId, targetPrice);
        }
    }
}
