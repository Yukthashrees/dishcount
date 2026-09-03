package com.dishcount.service;

import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class PriceCalculationService {

    /**
     * Core Price Calculation Formula:
     * FINAL PRICE = itemPrice + deliveryFee + platformFee + packagingFee + tax - discount
     */
    public BigDecimal calculateFinalPrice(
            BigDecimal itemPrice,
            BigDecimal deliveryFee,
            BigDecimal platformFee,
            BigDecimal packagingFee,
            BigDecimal tax,
            BigDecimal discount
    ) {
        BigDecimal safeItem = itemPrice != null ? itemPrice : BigDecimal.ZERO;
        BigDecimal safeDelivery = deliveryFee != null ? deliveryFee : BigDecimal.ZERO;
        BigDecimal safePlatformFee = platformFee != null ? platformFee : BigDecimal.ZERO;
        BigDecimal safePackaging = packagingFee != null ? packagingFee : BigDecimal.ZERO;
        BigDecimal safeTax = tax != null ? tax : BigDecimal.ZERO;
        BigDecimal safeDiscount = discount != null ? discount : BigDecimal.ZERO;

        BigDecimal subtotal = safeItem.add(safeDelivery).add(safePlatformFee).add(safePackaging).add(safeTax);
        BigDecimal finalPrice = subtotal.subtract(safeDiscount);

        return finalPrice.compareTo(BigDecimal.ZERO) < 0 
                ? BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP) 
                : finalPrice.setScale(2, RoundingMode.HALF_UP);
    }
}
