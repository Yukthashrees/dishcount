package com.dishcount.dto;

import java.util.List;

public class SearchResponseDto {
    private String query;
    private List<RestaurantDto> restaurants;
    private List<DishDto> matchingDishes;

    public SearchResponseDto() {}

    public SearchResponseDto(String query, List<RestaurantDto> restaurants, List<DishDto> matchingDishes) {
        this.query = query;
        this.restaurants = restaurants;
        this.matchingDishes = matchingDishes;
    }

    public static Builder builder() { return new Builder(); }

    public String getQuery() { return query; }
    public void setQuery(String query) { this.query = query; }

    public List<RestaurantDto> getRestaurants() { return restaurants; }
    public void setRestaurants(List<RestaurantDto> restaurants) { this.restaurants = restaurants; }

    public List<DishDto> getMatchingDishes() { return matchingDishes; }
    public void setMatchingDishes(List<DishDto> matchingDishes) { this.matchingDishes = matchingDishes; }

    public static class Builder {
        private String query;
        private List<RestaurantDto> restaurants;
        private List<DishDto> matchingDishes;

        public Builder query(String query) { this.query = query; return this; }
        public Builder restaurants(List<RestaurantDto> restaurants) { this.restaurants = restaurants; return this; }
        public Builder matchingDishes(List<DishDto> matchingDishes) { this.matchingDishes = matchingDishes; return this; }

        public SearchResponseDto build() {
            return new SearchResponseDto(query, restaurants, matchingDishes);
        }
    }
}
