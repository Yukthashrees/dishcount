package com.dishcount.service;

import com.dishcount.adapter.PlatformAdapter;
import com.dishcount.adapter.PlatformPriceResponse;
import com.dishcount.dto.ComparisonResponseDto;
import com.dishcount.dto.PlatformPriceBreakdownDto;
import com.dishcount.entity.Dish;
import com.dishcount.entity.Location;
import com.dishcount.entity.Restaurant;

import com.dishcount.exception.ResourceNotFoundException;
import com.dishcount.repository.DishRepository;

import com.dishcount.repository.RestaurantRepository;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ComparisonService {

    private final RestaurantRepository restaurantRepository;
    private final DishRepository dishRepository;
    private final PriceCalculationService priceCalculationService;
    private final List<PlatformAdapter> platformAdapters;

    public ComparisonService(
            RestaurantRepository restaurantRepository,
            DishRepository dishRepository,
            PriceCalculationService priceCalculationService,
            List<PlatformAdapter> platformAdapters
    ) {
        this.restaurantRepository = restaurantRepository;
        this.dishRepository = dishRepository;
        this.priceCalculationService = priceCalculationService;
        this.platformAdapters = platformAdapters;
    }

    public ComparisonResponseDto comparePrices(Long dishId, Long restaurantId, String locationName) {
        Dish dish = dishRepository.findById(dishId != null ? dishId : 1L)
                .orElseThrow(() -> new ResourceNotFoundException("Dish not found with id: " + dishId));

        Restaurant restaurant = restaurantRepository.findById(restaurantId != null ? restaurantId : 1L)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + restaurantId));

        Location location = Location.builder()
                .name(locationName != null ? locationName : "Bengaluru")
                .build();

        List<PlatformPriceBreakdownDto> priceResults = new ArrayList<>();

        for (PlatformAdapter adapter : platformAdapters) {
            if (!adapter.isEnabled()) continue;

            PlatformPriceResponse res = adapter.getPrice(restaurant, dish, location);

            BigDecimal finalPrice = priceCalculationService.calculateFinalPrice(
                    res.getItemPrice(), res.getDeliveryFee(), res.getPlatformFee(),
                    res.getPackagingFee(), res.getTax(), res.getDiscount()
            );

            priceResults.add(PlatformPriceBreakdownDto.builder()
                    .platformId(adapter.getPlatformId())
                    .platformName(adapter.getPlatformName())
                    .basePrice(dish.getBasePrice())
                    .itemPrice(res.getItemPrice())
                    .deliveryFee(res.getDeliveryFee())
                    .platformFee(res.getPlatformFee())
                    .packagingFee(res.getPackagingFee())
                    .taxes(res.getTax())
                    .discount(res.getDiscount())
                    .restaurantDiscount(res.getDiscount() != null ? res.getDiscount().multiply(BigDecimal.valueOf(0.6)) : BigDecimal.ZERO)
                    .couponDiscount(res.getDiscount() != null ? res.getDiscount().multiply(BigDecimal.valueOf(0.4)) : BigDecimal.ZERO)
                    .finalPayablePrice(finalPrice.setScale(2, RoundingMode.HALF_UP))
                    .deliveryTimeMinutes(res.getDeliveryTime())
                    .available(res.getAvailable() != null ? res.getAvailable() : true)
                    .couponCode(res.getCouponCode())
                    .scoreReason(res.getScoreReason())
                    .deepLink(res.getDeepLink())
                    .logoUrl(res.getLogoUrl())
                    .isBestDeal(false)
                    .build());
        }

        priceResults.sort(Comparator.comparing(PlatformPriceBreakdownDto::getFinalPayablePrice));

        PlatformPriceBreakdownDto cheapest = null;
        BigDecimal maxSavings = BigDecimal.ZERO;

        if (!priceResults.isEmpty()) {
            cheapest = priceResults.get(0);
            PlatformPriceBreakdownDto highest = priceResults.get(priceResults.size() - 1);

            maxSavings = highest.getFinalPayablePrice().subtract(cheapest.getFinalPayablePrice());
            if (maxSavings.compareTo(BigDecimal.ZERO) < 0) {
                maxSavings = BigDecimal.ZERO;
            }

            cheapest.setIsBestDeal(true);
            cheapest.setSavingsVsHighest(maxSavings.setScale(2, RoundingMode.HALF_UP));
        }

        return ComparisonResponseDto.builder()
                .comparisonId(System.currentTimeMillis())
                .dishName(dish.getName())
                .restaurantName(restaurant.getName())
                .location(location.getName())
                .results(priceResults)
                .bestDeal(cheapest)
                .maximumSavings(maxSavings.setScale(2, RoundingMode.HALF_UP))
                .build();
    }
}
