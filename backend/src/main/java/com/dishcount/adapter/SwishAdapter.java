package com.dishcount.adapter;

import com.dishcount.entity.Dish;
import com.dishcount.entity.Location;
import com.dishcount.entity.Restaurant;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
public class SwishAdapter implements PlatformAdapter {

    @Override
    public String getPlatformId() { return "swish"; }

    @Override
    public String getPlatformName() { return "SWISH"; }

    @Override
    public boolean isEnabled() { return true; }

    @Override
    public PlatformPriceResponse getPrice(Restaurant restaurant, Dish dish, Location location) {
        BigDecimal base = dish.getBasePrice() != null ? dish.getBasePrice() : BigDecimal.valueOf(320);
        BigDecimal itemPrice = base.add(BigDecimal.valueOf(10));
        BigDecimal deliveryFee = BigDecimal.valueOf(19);
        BigDecimal platformFee = BigDecimal.valueOf(4);
        BigDecimal packagingFee = BigDecimal.valueOf(8);
        BigDecimal tax = itemPrice.multiply(BigDecimal.valueOf(0.05));
        BigDecimal discount = BigDecimal.valueOf(30);

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
                .deliveryTime(15) // Ultra fast 10-15 min
                .available(true)
                .couponCode("SWISH15")
                .scoreReason("15-Minute ultra fast lightning delivery option")
                .deepLink("https://swish.app/search?q=" + dish.getName())
                .logoUrl("https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=100&q=80")
                .build();
    }
}
