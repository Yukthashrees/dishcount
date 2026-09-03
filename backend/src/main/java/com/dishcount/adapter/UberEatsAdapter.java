package com.dishcount.adapter;

import com.dishcount.entity.Dish;
import com.dishcount.entity.Location;
import com.dishcount.entity.Restaurant;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
public class UberEatsAdapter implements PlatformAdapter {

    @Override
    public String getPlatformId() { return "ubereats"; }

    @Override
    public String getPlatformName() { return "Uber Eats"; }

    @Override
    public boolean isEnabled() { return true; }

    @Override
    public PlatformPriceResponse getPrice(Restaurant restaurant, Dish dish, Location location) {
        BigDecimal base = dish.getBasePrice() != null ? dish.getBasePrice() : BigDecimal.valueOf(320);
        BigDecimal itemPrice = base.add(BigDecimal.valueOf(25));
        BigDecimal deliveryFee = BigDecimal.valueOf(35);
        BigDecimal platformFee = BigDecimal.valueOf(8);
        BigDecimal packagingFee = BigDecimal.valueOf(12);
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
                .deliveryTime(24)
                .available(true)
                .couponCode("EATS2026")
                .scoreReason("Premium Uber One priority delivery pass rate")
                .deepLink("https://ubereats.com/search?q=" + dish.getName())
                .logoUrl("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=100&q=80")
                .build();
    }
}
