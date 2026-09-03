package com.dishcount.dto;

import java.math.BigDecimal;
import java.util.List;

public class ComparisonResponseDto {

    private Long comparisonId;
    private String dishName;
    private String restaurantName;
    private String location;
    private List<PlatformPriceBreakdownDto> results;
    private PlatformPriceBreakdownDto bestDeal;
    private BigDecimal maximumSavings;

    public ComparisonResponseDto() {}

    public ComparisonResponseDto(Long comparisonId, String dishName, String restaurantName, String location, List<PlatformPriceBreakdownDto> results, PlatformPriceBreakdownDto bestDeal, BigDecimal maximumSavings) {
        this.comparisonId = comparisonId;
        this.dishName = dishName;
        this.restaurantName = restaurantName;
        this.location = location;
        this.results = results;
        this.bestDeal = bestDeal;
        this.maximumSavings = maximumSavings;
    }

    public static Builder builder() { return new Builder(); }

    public Long getComparisonId() { return comparisonId; }
    public void setComparisonId(Long comparisonId) { this.comparisonId = comparisonId; }

    public String getDishName() { return dishName; }
    public void setDishName(String dishName) { this.dishName = dishName; }

    public String getRestaurantName() { return restaurantName; }
    public void setRestaurantName(String restaurantName) { this.restaurantName = restaurantName; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public List<PlatformPriceBreakdownDto> getResults() { return results; }
    public void setResults(List<PlatformPriceBreakdownDto> results) { this.results = results; }

    public PlatformPriceBreakdownDto getBestDeal() { return bestDeal; }
    public void setBestDeal(PlatformPriceBreakdownDto bestDeal) { this.bestDeal = bestDeal; }

    public BigDecimal getMaximumSavings() { return maximumSavings; }
    public void setMaximumSavings(BigDecimal maximumSavings) { this.maximumSavings = maximumSavings; }

    public static class Builder {
        private Long comparisonId;
        private String dishName;
        private String restaurantName;
        private String location;
        private List<PlatformPriceBreakdownDto> results;
        private PlatformPriceBreakdownDto bestDeal;
        private BigDecimal maximumSavings;

        public Builder comparisonId(Long comparisonId) { this.comparisonId = comparisonId; return this; }
        public Builder dishName(String dishName) { this.dishName = dishName; return this; }
        public Builder restaurantName(String restaurantName) { this.restaurantName = restaurantName; return this; }
        public Builder location(String location) { this.location = location; return this; }
        public Builder results(List<PlatformPriceBreakdownDto> results) { this.results = results; return this; }
        public Builder bestDeal(PlatformPriceBreakdownDto bestDeal) { this.bestDeal = bestDeal; return this; }
        public Builder maximumSavings(BigDecimal maximumSavings) { this.maximumSavings = maximumSavings; return this; }

        public ComparisonResponseDto build() {
            return new ComparisonResponseDto(comparisonId, dishName, restaurantName, location, results, bestDeal, maximumSavings);
        }
    }
}
