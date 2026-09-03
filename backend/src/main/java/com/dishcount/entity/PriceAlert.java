package com.dishcount.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "price_alerts")
public class PriceAlert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dish_id", nullable = false)
    private Dish dish;

    @Column(nullable = false)
    private BigDecimal targetPrice;

    private Boolean active = true;

    private LocalDateTime createdAt = LocalDateTime.now();

    public PriceAlert() {}

    public PriceAlert(Long id, User user, Dish dish, BigDecimal targetPrice, Boolean active, LocalDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.dish = dish;
        this.targetPrice = targetPrice;
        this.active = active != null ? active : true;
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    public static Builder builder() { return new Builder(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Dish getDish() { return dish; }
    public void setDish(Dish dish) { this.dish = dish; }

    public BigDecimal getTargetPrice() { return targetPrice; }
    public void setTargetPrice(BigDecimal targetPrice) { this.targetPrice = targetPrice; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static class Builder {
        private Long id;
        private User user;
        private Dish dish;
        private BigDecimal targetPrice;
        private Boolean active = true;
        private LocalDateTime createdAt = LocalDateTime.now();

        public Builder id(Long id) { this.id = id; return this; }
        public Builder user(User user) { this.user = user; return this; }
        public Builder dish(Dish dish) { this.dish = dish; return this; }
        public Builder targetPrice(BigDecimal targetPrice) { this.targetPrice = targetPrice; return this; }
        public Builder active(Boolean active) { this.active = active; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public PriceAlert build() {
            return new PriceAlert(id, user, dish, targetPrice, active, createdAt);
        }
    }
}
