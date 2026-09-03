package com.dishcount.adapter;

import com.dishcount.entity.Dish;
import com.dishcount.entity.Location;
import com.dishcount.entity.Restaurant;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
public class SwiggyAdapter implements PlatformAdapter {

    @Override
    public String getPlatformId() { return "swiggy"; }

    @Override
    public String getPlatformName() { return "Swiggy"; }

    @Override
    public boolean isEnabled() { return true; }

    @Override
    public PlatformPriceResponse getPrice(Restaurant restaurant, Dish dish, Location location) {
        BigDecimal base = dish.getBasePrice() != null ? dish.getBasePrice() : BigDecimal.valueOf(320);
        BigDecimal itemPrice = base.add(BigDecimal.valueOf(30)); // Swiggy slight item markup
        BigDecimal deliveryFee = BigDecimal.valueOf(39);
        BigDecimal platformFee = BigDecimal.valueOf(7);
        BigDecimal packagingFee = BigDecimal.valueOf(10);
        BigDecimal tax = itemPrice.multiply(BigDecimal.valueOf(0.05));
        BigDecimal discount = BigDecimal.valueOf(40); // SWIGGYIT coupon

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
                .deliveryTime(28)
                .available(true)
                .couponCode("SWIGGYIT")
                .scoreReason("Standard delivery rate with SWIGGYIT coupon discount")
                .deepLink("https://swiggy.com/search?q=" + dish.getName())
                .logoUrl("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80")
                .build();
    }
}
