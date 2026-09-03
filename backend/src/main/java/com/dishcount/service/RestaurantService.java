package com.dishcount.service;

import com.dishcount.dto.DishDto;
import com.dishcount.dto.RestaurantDto;
import com.dishcount.entity.Dish;
import com.dishcount.entity.Restaurant;
import com.dishcount.entity.RestaurantDish;
import com.dishcount.entity.RestaurantMood;
import com.dishcount.exception.ResourceNotFoundException;
import com.dishcount.repository.RestaurantDishRepository;
import com.dishcount.repository.RestaurantMoodRepository;
import com.dishcount.repository.RestaurantRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final RestaurantDishRepository restaurantDishRepository;
    private final RestaurantMoodRepository restaurantMoodRepository;

    public RestaurantService(RestaurantRepository restaurantRepository, RestaurantDishRepository restaurantDishRepository, RestaurantMoodRepository restaurantMoodRepository) {
        this.restaurantRepository = restaurantRepository;
        this.restaurantDishRepository = restaurantDishRepository;
        this.restaurantMoodRepository = restaurantMoodRepository;
    }

    public List<RestaurantDto> getAllRestaurants() {
        return restaurantRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public RestaurantDto getRestaurantById(Long id) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + id));
        return mapToDto(restaurant);
    }

    public List<DishDto> getDishesForRestaurant(Long restaurantId) {
        List<RestaurantDish> rds = restaurantDishRepository.findByRestaurantId(restaurantId);
        return rds.stream()
                .map(rd -> {
                    Dish d = rd.getDish();
                    return DishDto.builder()
                            .id(d.getId())
                            .name(d.getName())
                            .description(d.getDescription())
                            .category(d.getCategory())
                            .basePrice(d.getBasePrice())
                            .imageUrl(d.getImageUrl())
                            .rating(d.getRating())
                            .restaurantId(restaurantId)
                            .restaurantName(rd.getRestaurant().getName())
                            .build();
                })
                .collect(Collectors.toList());
    }

    public List<RestaurantDto> getRestaurantsByMood(String moodName) {
        List<Restaurant> restaurants = restaurantRepository.findByMoodName(moodName);
        return restaurants.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private RestaurantDto mapToDto(Restaurant r) {
        List<DishDto> dishes = getDishesForRestaurant(r.getId());
        List<String> moods = restaurantMoodRepository.findByRestaurantId(r.getId()).stream()
                .map(rm -> rm.getMood().getName())
                .collect(Collectors.toList());

        return RestaurantDto.builder()
                .id(r.getId())
                .name(r.getName())
                .description(r.getDescription())
                .cuisine(r.getCuisine())
                .rating(r.getRating())
                .latitude(r.getLatitude())
                .longitude(r.getLongitude())
                .imageUrl(r.getImageUrl())
                .address(r.getAddress())
                .active(r.getActive())
                .popularDishes(dishes)
                .moods(moods)
                .build();
    }
}
