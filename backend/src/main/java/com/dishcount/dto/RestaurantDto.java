package com.dishcount.dto;

import java.util.List;

public class RestaurantDto {
    private Long id;
    private String name;
    private String description;
    private String cuisine;
    private Double rating;
    private Double latitude;
    private Double longitude;
    private String imageUrl;
    private String address;
    private Boolean active;
    private List<DishDto> popularDishes;
    private List<String> moods;

    public RestaurantDto() {}

    public RestaurantDto(Long id, String name, String description, String cuisine, Double rating, Double latitude, Double longitude, String imageUrl, String address, Boolean active, List<DishDto> popularDishes, List<String> moods) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.cuisine = cuisine;
        this.rating = rating;
        this.latitude = latitude;
        this.longitude = longitude;
        this.imageUrl = imageUrl;
        this.address = address;
        this.active = active;
        this.popularDishes = popularDishes;
        this.moods = moods;
    }

    public static Builder builder() { return new Builder(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCuisine() { return cuisine; }
    public void setCuisine(String cuisine) { this.cuisine = cuisine; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public List<DishDto> getPopularDishes() { return popularDishes; }
    public void setPopularDishes(List<DishDto> popularDishes) { this.popularDishes = popularDishes; }

    public List<String> getMoods() { return moods; }
    public void setMoods(List<String> moods) { this.moods = moods; }

    public static class Builder {
        private Long id;
        private String name;
        private String description;
        private String cuisine;
        private Double rating;
        private Double latitude;
        private Double longitude;
        private String imageUrl;
        private String address;
        private Boolean active;
        private List<DishDto> popularDishes;
        private List<String> moods;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder cuisine(String cuisine) { this.cuisine = cuisine; return this; }
        public Builder rating(Double rating) { this.rating = rating; return this; }
        public Builder latitude(Double latitude) { this.latitude = latitude; return this; }
        public Builder longitude(Double longitude) { this.longitude = longitude; return this; }
        public Builder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public Builder address(String address) { this.address = address; return this; }
        public Builder active(Boolean active) { this.active = active; return this; }
        public Builder popularDishes(List<DishDto> popularDishes) { this.popularDishes = popularDishes; return this; }
        public Builder moods(List<String> moods) { this.moods = moods; return this; }

        public RestaurantDto build() {
            return new RestaurantDto(id, name, description, cuisine, rating, latitude, longitude, imageUrl, address, active, popularDishes, moods);
        }
    }
}
