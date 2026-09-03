package com.dishcount.adapter;

import com.dishcount.entity.Dish;
import com.dishcount.entity.Location;
import com.dishcount.entity.Restaurant;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
public class ZomatoAdapter implements PlatformAdapter {

    @Override
    public String getPlatformId() { return "zomato"; }

    @Override
    public String getPlatformName() { return "Zomato"; }

    @Override
    public boolean isEnabled() { return true; }

    @Override
    public PlatformPriceResponse getPrice(Restaurant restaurant, Dish dish, Location location) {
        BigDecimal base = dish.getBasePrice() != null ? dish.getBasePrice() : BigDecimal.valueOf(320);
        BigDecimal itemPrice = base.add(BigDecimal.valueOf(20));
        BigDecimal deliveryFee = BigDecimal.valueOf(29);
        BigDecimal platformFee = BigDecimal.valueOf(6);
        BigDecimal packagingFee = BigDecimal.valueOf(10);
        BigDecimal tax = itemPrice.multiply(BigDecimal.valueOf(0.05));
        BigDecimal discount = BigDecimal.valueOf(60); // ZOMPAYDAY coupon

        BigDecimal finalPrice = itemPrice.add(deliveryFee).add(platformFee).add(packagingFee).add(tax).subtract(discount);

        return PlatformPriceResponse.builder()
                .platformId(getPlatformId())
                .platformName(getPlatformName())
                .itemPrice(itemPrice)
                .deliveryFee(deliveryFee)
                .platformFee(platformFee)
                .packagingFee(packagingFee)
                .tax(tax)
                .discount(discount)
                .finalPrice(finalPrice)
                .deliveryTime(22)
                .available(true)
                .couponCode("ZOMPAYDAY")
                .scoreReason("Flat ₹60 Gold discount applied for superfast express delivery")
                .deepLink("https://zomato.com/search?q=" + dish.getName())
                .logoUrl("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=100&q=80")
                .build();
    }
}
