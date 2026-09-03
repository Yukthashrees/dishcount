package com.dishcount.service;

import com.dishcount.dto.DishDto;
import com.dishcount.dto.RestaurantDto;
import com.dishcount.dto.SearchResponseDto;
import com.dishcount.entity.Dish;
import com.dishcount.entity.Restaurant;
import com.dishcount.repository.DishRepository;
import com.dishcount.repository.RestaurantRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchService {

    private final RestaurantRepository restaurantRepository;
    private final DishRepository dishRepository;
    private final RestaurantService restaurantService;

    public SearchService(RestaurantRepository restaurantRepository, DishRepository dishRepository, RestaurantService restaurantService) {
        this.restaurantRepository = restaurantRepository;
        this.dishRepository = dishRepository;
        this.restaurantService = restaurantService;
    }

    public SearchResponseDto search(String query) {
        if (query == null || query.trim().isEmpty()) {
            return SearchResponseDto.builder()
                    .query("")
                    .restaurants(restaurantService.getAllRestaurants())
                    .matchingDishes(getAllDishesMapped())
                    .build();
        }

        String q = query.trim().toLowerCase();

        List<Restaurant> restaurants = restaurantRepository.findByNameContainingIgnoreCaseOrCuisineContainingIgnoreCase(q, q);
        List<Dish> dishes = dishRepository.findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(q, q);

        List<RestaurantDto> restaurantDtos = restaurants.stream()
                .map(r -> restaurantService.getRestaurantById(r.getId()))
                .collect(Collectors.toList());

        List<DishDto> dishDtos = dishes.stream()
                .map(d -> DishDto.builder()
                        .id(d.getId())
                        .name(d.getName())
                        .description(d.getDescription())
                        .category(d.getCategory())
                        .basePrice(d.getBasePrice())
                        .imageUrl(d.getImageUrl())
                        .rating(d.getRating())
                        .build())
                .collect(Collectors.toList());

        return SearchResponseDto.builder()
                .query(query)
                .restaurants(restaurantDtos)
                .matchingDishes(dishDtos)
                .build();
    }

    private List<DishDto> getAllDishesMapped() {
        return dishRepository.findAll().stream()
                .map(d -> DishDto.builder()
                        .id(d.getId())
                        .name(d.getName())
                        .description(d.getDescription())
                        .category(d.getCategory())
                        .basePrice(d.getBasePrice())
                        .imageUrl(d.getImageUrl())
                        .rating(d.getRating())
                        .build())
                .collect(Collectors.toList());
    }
}
