package com.dishcount.adapter;

import com.dishcount.entity.Dish;
import com.dishcount.entity.Location;
import com.dishcount.entity.Restaurant;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
public class EatSureAdapter implements PlatformAdapter {

    @Override
    public String getPlatformId() { return "eatsure"; }

    @Override
    public String getPlatformName() { return "EatSure"; }

    @Override
    public boolean isEnabled() { return true; }

    @Override
    public PlatformPriceResponse getPrice(Restaurant restaurant, Dish dish, Location location) {
        BigDecimal base = dish.getBasePrice() != null ? dish.getBasePrice() : BigDecimal.valueOf(320);
        BigDecimal itemPrice = base; // Zero markup
        BigDecimal deliveryFee = BigDecimal.valueOf(0); // Free delivery offer
        BigDecimal platformFee = BigDecimal.valueOf(5);
        BigDecimal packagingFee = BigDecimal.valueOf(15);
        BigDecimal tax = itemPrice.multiply(BigDecimal.valueOf(0.05));
        BigDecimal discount = BigDecimal.valueOf(25);

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
                .deliveryTime(35)
                .available(true)
                .couponCode("SUREPASS")
                .scoreReason("Zero delivery fee guarantee with hygienic safety packaging")
                .deepLink("https://eatsure.com/search?q=" + dish.getName())
                .logoUrl("https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=100&q=80")
                .build();
    }
}
