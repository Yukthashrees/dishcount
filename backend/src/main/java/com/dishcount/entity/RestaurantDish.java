package com.dishcount.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "restaurant_dishes", indexes = {
    @Index(name = "idx_rd_restaurant", columnList = "restaurant_id"),
    @Index(name = "idx_rd_dish", columnList = "dish_id")
})
public class RestaurantDish {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    private Restaurant restaurant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dish_id", nullable = false)
    private Dish dish;

    private Boolean available = true;

    public RestaurantDish() {}

    public RestaurantDish(Long id, Restaurant restaurant, Dish dish, Boolean available) {
        this.id = id;
        this.restaurant = restaurant;
        this.dish = dish;
        this.available = available != null ? available : true;
    }

    public static Builder builder() { return new Builder(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Restaurant getRestaurant() { return restaurant; }
    public void setRestaurant(Restaurant restaurant) { this.restaurant = restaurant; }

    public Dish getDish() { return dish; }
    public void setDish(Dish dish) { this.dish = dish; }

    public Boolean getAvailable() { return available; }
    public void setAvailable(Boolean available) { this.available = available; }

    public static class Builder {
        private Long id;
        private Restaurant restaurant;
        private Dish dish;
        private Boolean available = true;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder restaurant(Restaurant restaurant) { this.restaurant = restaurant; return this; }
        public Builder dish(Dish dish) { this.dish = dish; return this; }
        public Builder available(Boolean available) { this.available = available; return this; }

        public RestaurantDish build() {
            return new RestaurantDish(id, restaurant, dish, available);
        }
    }
}
