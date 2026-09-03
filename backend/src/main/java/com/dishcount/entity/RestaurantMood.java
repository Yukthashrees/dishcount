package com.dishcount.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "restaurant_moods")
public class RestaurantMood {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    private Restaurant restaurant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mood_id", nullable = false)
    private Mood mood;

    public RestaurantMood() {}

    public RestaurantMood(Long id, Restaurant restaurant, Mood mood) {
        this.id = id;
        this.restaurant = restaurant;
        this.mood = mood;
    }

    public static Builder builder() { return new Builder(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Restaurant getRestaurant() { return restaurant; }
    public void setRestaurant(Restaurant restaurant) { this.restaurant = restaurant; }

    public Mood getMood() { return mood; }
    public void setMood(Mood mood) { this.mood = mood; }

    public static class Builder {
        private Long id;
        private Restaurant restaurant;
        private Mood mood;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder restaurant(Restaurant restaurant) { this.restaurant = restaurant; return this; }
        public Builder mood(Mood mood) { this.mood = mood; return this; }

        public RestaurantMood build() {
            return new RestaurantMood(id, restaurant, mood);
        }
    }
}
