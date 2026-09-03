package com.dishcount.adapter;

import com.dishcount.entity.Dish;
import com.dishcount.entity.Location;
import com.dishcount.entity.Restaurant;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
public class FoodpandaAdapter implements PlatformAdapter {

    @Override
    public String getPlatformId() { return "foodpanda"; }

    @Override
    public String getPlatformName() { return "Foodpanda"; }

    @Override
    public boolean isEnabled() { return true; }

    @Override
    public PlatformPriceResponse getPrice(Restaurant restaurant, Dish dish, Location location) {
        BigDecimal base = dish.getBasePrice() != null ? dish.getBasePrice() : BigDecimal.valueOf(320);
        BigDecimal itemPrice = base.add(BigDecimal.valueOf(15));
        BigDecimal deliveryFee = BigDecimal.valueOf(25);
        BigDecimal platformFee = BigDecimal.valueOf(5);
        BigDecimal packagingFee = BigDecimal.valueOf(10);
        BigDecimal tax = itemPrice.multiply(BigDecimal.valueOf(0.05));
        BigDecimal discount = BigDecimal.valueOf(35);

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
                .deliveryTime(26)
                .available(true)
                .couponCode("PANDASAVE")
                .scoreReason("Standard rate with Pandapro free delivery discount")
                .deepLink("https://foodpanda.com/search?q=" + dish.getName())
                .logoUrl("https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=100&q=80")
                .build();
    }
}
