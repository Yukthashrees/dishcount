package com.dishcount.dto;

public class FavoriteRequestDto {

    private Long restaurantId;
    private Long dishId;

    public FavoriteRequestDto() {}

    public FavoriteRequestDto(Long restaurantId, Long dishId) {
        this.restaurantId = restaurantId;
        this.dishId = dishId;
    }

    public static Builder builder() { return new Builder(); }

    public Long getRestaurantId() { return restaurantId; }
    public void setRestaurantId(Long restaurantId) { this.restaurantId = restaurantId; }

    public Long getDishId() { return dishId; }
    public void setDishId(Long dishId) { this.dishId = dishId; }

    public static class Builder {
        private Long restaurantId;
        private Long dishId;

        public Builder restaurantId(Long restaurantId) { this.restaurantId = restaurantId; return this; }
        public Builder dishId(Long dishId) { this.dishId = dishId; return this; }

        public FavoriteRequestDto build() {
            return new FavoriteRequestDto(restaurantId, dishId);
        }
    }
}
