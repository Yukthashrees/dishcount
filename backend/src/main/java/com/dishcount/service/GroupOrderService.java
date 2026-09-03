package com.dishcount.service;

import com.dishcount.adapter.PlatformAdapter;
import com.dishcount.adapter.PlatformPriceResponse;
import com.dishcount.dto.GroupOrderRequestDto;
import com.dishcount.dto.GroupOrderResponseDto;
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

@Service
public class GroupOrderService {

    private final RestaurantRepository restaurantRepository;
    private final DishRepository dishRepository;
    private final List<PlatformAdapter> platformAdapters;

    public GroupOrderService(RestaurantRepository restaurantRepository, DishRepository dishRepository, List<PlatformAdapter> platformAdapters) {
        this.restaurantRepository = restaurantRepository;
        this.dishRepository = dishRepository;
        this.platformAdapters = platformAdapters;
    }

    public GroupOrderResponseDto calculateGroupOrder(GroupOrderRequestDto request) {
        Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId())
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + request.getRestaurantId()));

        Location location = Location.builder()
                .name(request.getLocation() != null ? request.getLocation() : "Bengaluru")
                .build();

        int totalCount = request.getItems().stream().mapToInt(GroupOrderRequestDto.GroupOrderItemDto::getQuantity).sum();

        List<GroupOrderResponseDto.PlatformGroupTotalDto> platformTotals = new ArrayList<>();

        for (PlatformAdapter adapter : platformAdapters) {
            if (!adapter.isEnabled()) continue;

            BigDecimal subtotal = BigDecimal.ZERO;
            BigDecimal totalDeliveryFee = BigDecimal.valueOf(35);
            BigDecimal totalPlatformFee = BigDecimal.valueOf(10);
            BigDecimal totalPackagingFee = BigDecimal.valueOf(20);
            BigDecimal totalDiscount = BigDecimal.valueOf(50);

            for (GroupOrderRequestDto.GroupOrderItemDto item : request.getItems()) {
                Dish dish = dishRepository.findById(item.getDishId())
                        .orElseThrow(() -> new ResourceNotFoundException("Dish not found: " + item.getDishId()));

                PlatformPriceResponse priceRes = adapter.getPrice(restaurant, dish, location);
                BigDecimal itemPrice = priceRes.getItemPrice() != null ? priceRes.getItemPrice() : dish.getBasePrice();
                subtotal = subtotal.add(itemPrice.multiply(BigDecimal.valueOf(item.getQuantity())));
            }

            BigDecimal tax = subtotal.multiply(BigDecimal.valueOf(0.05));
            BigDecimal finalPrice = subtotal.add(totalDeliveryFee).add(totalPlatformFee).add(totalPackagingFee).add(tax).subtract(totalDiscount);

            platformTotals.add(GroupOrderResponseDto.PlatformGroupTotalDto.builder()
                    .platformId(adapter.getPlatformId())
                    .platformName(adapter.getPlatformName())
                    .subtotal(subtotal.setScale(2, RoundingMode.HALF_UP))
                    .deliveryFee(totalDeliveryFee)
                    .platformFee(totalPlatformFee)
                    .packagingFee(totalPackagingFee)
                    .tax(tax.setScale(2, RoundingMode.HALF_UP))
                    .discount(totalDiscount)
                    .finalPrice(finalPrice.setScale(2, RoundingMode.HALF_UP))
                    .isBestDeal(false)
                    .build());
        }

        platformTotals.sort(Comparator.comparing(GroupOrderResponseDto.PlatformGroupTotalDto::getFinalPrice));

        if (!platformTotals.isEmpty()) {
            GroupOrderResponseDto.PlatformGroupTotalDto cheapest = platformTotals.get(0);
            GroupOrderResponseDto.PlatformGroupTotalDto highest = platformTotals.get(platformTotals.size() - 1);
            cheapest.setIsBestDeal(true);
            BigDecimal savings = highest.getFinalPrice().subtract(cheapest.getFinalPrice());

            return GroupOrderResponseDto.builder()
                    .restaurantName(restaurant.getName())
                    .totalItemCount(totalCount)
                    .platformTotals(platformTotals)
                    .bestPlatform(cheapest.getPlatformName())
                    .totalSavings(savings.setScale(2, RoundingMode.HALF_UP))
                    .build();
        }

        return GroupOrderResponseDto.builder()
                .restaurantName(restaurant.getName())
                .totalItemCount(totalCount)
                .platformTotals(Collections.emptyList())
                .totalSavings(BigDecimal.ZERO)
                .build();
    }
}
