package com.dishcount.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class GroupOrderRequestDto {

    @NotNull
    private Long restaurantId;

    @NotEmpty
    private List<GroupOrderItemDto> items;

    private String location;

    public GroupOrderRequestDto() {}

    public GroupOrderRequestDto(Long restaurantId, List<GroupOrderItemDto> items, String location) {
        this.restaurantId = restaurantId;
        this.items = items;
        this.location = location;
    }

    public static Builder builder() { return new Builder(); }

    public Long getRestaurantId() { return restaurantId; }
    public void setRestaurantId(Long restaurantId) { this.restaurantId = restaurantId; }

    public List<GroupOrderItemDto> getItems() { return items; }
    public void setItems(List<GroupOrderItemDto> items) { this.items = items; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public static class GroupOrderItemDto {
        @NotNull
        private Long dishId;

        @NotNull
        private Integer quantity;

        public GroupOrderItemDto() {}

        public GroupOrderItemDto(Long dishId, Integer quantity) {
            this.dishId = dishId;
            this.quantity = quantity;
        }

        public Long getDishId() { return dishId; }
        public void setDishId(Long dishId) { this.dishId = dishId; }

        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }

    public static class Builder {
        private Long restaurantId;
        private List<GroupOrderItemDto> items;
        private String location;

        public Builder restaurantId(Long restaurantId) { this.restaurantId = restaurantId; return this; }
        public Builder items(List<GroupOrderItemDto> items) { this.items = items; return this; }
        public Builder location(String location) { this.location = location; return this; }

        public GroupOrderRequestDto build() {
            return new GroupOrderRequestDto(restaurantId, items, location);
        }
    }
}
