package com.dishcount.service;

import com.dishcount.dto.RestaurantDto;
import com.dishcount.entity.Restaurant;
import com.dishcount.repository.RestaurantRepository;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    private final RestaurantRepository restaurantRepository;
    private final RestaurantService restaurantService;

    public RecommendationService(RestaurantRepository restaurantRepository, RestaurantService restaurantService) {
        this.restaurantRepository = restaurantRepository;
        this.restaurantService = restaurantService;
    }

    public List<RestaurantDto> getRecommendations(String mood, Double maxBudget, String cuisine) {
        List<Restaurant> restaurants = (mood != null && !mood.isEmpty())
                ? restaurantRepository.findByMoodName(mood)
                : restaurantRepository.findAll();

        if (restaurants.isEmpty()) {
            restaurants = restaurantRepository.findAll();
        }

        return restaurants.stream()
                .sorted((r1, r2) -> Double.compare(calculateScore(r2, mood, cuisine), calculateScore(r1, mood, cuisine)))
                .map(r -> restaurantService.getRestaurantById(r.getId()))
                .collect(Collectors.toList());
    }

    private double calculateScore(Restaurant r, String mood, String cuisine) {
        double moodScore = 0.30 * 100.0;
        double ratingScore = 0.20 * (r.getRating() != null ? r.getRating() * 20.0 : 80.0);
        double priceScore = 0.25 * 90.0;
        double distanceScore = 0.15 * 85.0;
        double offerScore = 0.10 * 95.0;

        if (cuisine != null && r.getCuisine() != null && r.getCuisine().toLowerCase().contains(cuisine.toLowerCase())) {
            moodScore += 10.0;
        }

        return moodScore + ratingScore + priceScore + distanceScore + offerScore;
    }
}
