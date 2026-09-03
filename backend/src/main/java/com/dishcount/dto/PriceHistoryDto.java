package com.dishcount.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class PriceHistoryDto {

    private Long dishId;
    private String dishName;
    private String timeframe;
    private List<PricePointDto> points;

    public PriceHistoryDto() {}

    public PriceHistoryDto(Long dishId, String dishName, String timeframe, List<PricePointDto> points) {
        this.dishId = dishId;
        this.dishName = dishName;
        this.timeframe = timeframe;
        this.points = points;
    }

    public static Builder builder() { return new Builder(); }

    public Long getDishId() { return dishId; }
    public void setDishId(Long dishId) { this.dishId = dishId; }

    public String getDishName() { return dishName; }
    public void setDishName(String dishName) { this.dishName = dishName; }

    public String getTimeframe() { return timeframe; }
    public void setTimeframe(String timeframe) { this.timeframe = timeframe; }

    public List<PricePointDto> getPoints() { return points; }
    public void setPoints(List<PricePointDto> points) { this.points = points; }

    public static class PricePointDto {
        private String platformName;
        private BigDecimal price;
        private LocalDateTime date;
        private String formattedDate;

        public PricePointDto() {}

        public PricePointDto(String platformName, BigDecimal price, LocalDateTime date, String formattedDate) {
            this.platformName = platformName;
            this.price = price;
            this.date = date;
            this.formattedDate = formattedDate;
        }

        public static PricePointDtoBuilder builder() { return new PricePointDtoBuilder(); }

        public String getPlatformName() { return platformName; }
        public void setPlatformName(String platformName) { this.platformName = platformName; }

        public BigDecimal getPrice() { return price; }
        public void setPrice(BigDecimal price) { this.price = price; }

        public LocalDateTime getDate() { return date; }
        public void setDate(LocalDateTime date) { this.date = date; }

        public String getFormattedDate() { return formattedDate; }
        public void setFormattedDate(String formattedDate) { this.formattedDate = formattedDate; }

        public static class PricePointDtoBuilder {
            private String platformName;
            private BigDecimal price;
            private LocalDateTime date;
            private String formattedDate;

            public PricePointDtoBuilder platformName(String platformName) { this.platformName = platformName; return this; }
            public PricePointDtoBuilder price(BigDecimal price) { this.price = price; return this; }
            public PricePointDtoBuilder date(LocalDateTime date) { this.date = date; return this; }
            public PricePointDtoBuilder formattedDate(String formattedDate) { this.formattedDate = formattedDate; return this; }

            public PricePointDto build() {
                return new PricePointDto(platformName, price, date, formattedDate);
            }
        }
    }

    public static class Builder {
        private Long dishId;
        private String dishName;
        private String timeframe;
        private List<PricePointDto> points;

        public Builder dishId(Long dishId) { this.dishId = dishId; return this; }
        public Builder dishName(String dishName) { this.dishName = dishName; return this; }
        public Builder timeframe(String timeframe) { this.timeframe = timeframe; return this; }
        public Builder points(List<PricePointDto> points) { this.points = points; return this; }

        public PriceHistoryDto build() {
            return new PriceHistoryDto(dishId, dishName, timeframe, points);
        }
    }
}
