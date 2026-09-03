package com.dishcount.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "dishes", indexes = {
    @Index(name = "idx_dish_name", columnList = "name"),
    @Index(name = "idx_dish_category", columnList = "category")
})
public class Dish {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    private String category;

    @Column(nullable = false)
    private BigDecimal basePrice;

    private String imageUrl;

    private Double rating;

    public Dish() {}

    public Dish(Long id, String name, String description, String category, BigDecimal basePrice, String imageUrl, Double rating) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.basePrice = basePrice;
        this.imageUrl = imageUrl;
        this.rating = rating;
    }

    public static Builder builder() { return new Builder(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public BigDecimal getBasePrice() { return basePrice; }
    public void setBasePrice(BigDecimal basePrice) { this.basePrice = basePrice; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public static class Builder {
        private Long id;
        private String name;
        private String description;
        private String category;
        private BigDecimal basePrice;
        private String imageUrl;
        private Double rating;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder category(String category) { this.category = category; return this; }
        public Builder basePrice(BigDecimal basePrice) { this.basePrice = basePrice; return this; }
        public Builder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public Builder rating(Double rating) { this.rating = rating; return this; }

        public Dish build() {
            return new Dish(id, name, description, category, basePrice, imageUrl, rating);
        }
    }
}
