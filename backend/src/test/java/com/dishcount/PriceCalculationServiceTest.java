package com.dishcount;

import com.dishcount.service.PriceCalculationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import static org.junit.jupiter.api.Assertions.*;

class PriceCalculationServiceTest {

    private PriceCalculationService priceCalculationService;

    @BeforeEach
    void setUp() {
        priceCalculationService = new PriceCalculationService();
    }

    @Test
    void testCalculateFinalPriceFormula() {
        // Item = 320, Delivery = 39, Platform = 7, Packaging = 10, Tax = 17, Discount = 76 -> Expected = 317
        BigDecimal itemPrice = BigDecimal.valueOf(320);
        BigDecimal deliveryFee = BigDecimal.valueOf(39);
        BigDecimal platformFee = BigDecimal.valueOf(7);
        BigDecimal packagingFee = BigDecimal.valueOf(10);
        BigDecimal tax = BigDecimal.valueOf(17);
        BigDecimal discount = BigDecimal.valueOf(76);

        BigDecimal finalPrice = priceCalculationService.calculateFinalPrice(
                itemPrice, deliveryFee, platformFee, packagingFee, tax, discount
        );

        assertEquals(0, BigDecimal.valueOf(317).compareTo(finalPrice));
    }

    @Test
    void testCalculateFinalPriceWithNullValues() {
        BigDecimal finalPrice = priceCalculationService.calculateFinalPrice(
                BigDecimal.valueOf(100), null, null, null, null, null
        );

        assertEquals(0, BigDecimal.valueOf(100).compareTo(finalPrice));
    }
}
