package com.dishcount.adapter;

import com.dishcount.entity.Dish;
import com.dishcount.entity.Location;
import com.dishcount.entity.Restaurant;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
public class MagicpinAdapter implements PlatformAdapter {

    @Override
    public String getPlatformId() { return "magicpin"; }

    @Override
    public String getPlatformName() { return "Magicpin"; }

    @Override
    public boolean isEnabled() { return true; }

    @Override
    public PlatformPriceResponse getPrice(Restaurant restaurant, Dish dish, Location location) {
        BigDecimal base = dish.getBasePrice() != null ? dish.getBasePrice() : BigDecimal.valueOf(320);
        BigDecimal itemPrice = base.subtract(BigDecimal.valueOf(15)); // Direct voucher discount
        BigDecimal deliveryFee = BigDecimal.valueOf(15);
        BigDecimal platformFee = BigDecimal.valueOf(2);
        BigDecimal packagingFee = BigDecimal.valueOf(5);
        BigDecimal tax = itemPrice.multiply(BigDecimal.valueOf(0.05));
        BigDecimal discount = BigDecimal.valueOf(50); // MAGIC99 voucher discount

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
                .deliveryTime(30)
                .available(true)
                .couponCode("MAGIC99")
                .scoreReason("Lowest final payable cost with direct merchant cashback voucher")
                .deepLink("https://magicpin.in/search?q=" + dish.getName())
                .logoUrl("https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=100&q=80")
                .build();
    }
}
