package com.dishcount.controller;

import com.dishcount.dto.DishDto;
import com.dishcount.dto.RestaurantDto;
import com.dishcount.service.RestaurantService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/restaurants")
@Tag(name = "Restaurants", description = "Restaurant discovery, details, menu dishes, and mood curation")
public class RestaurantController {

    private final RestaurantService restaurantService;

    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping
    @Operation(summary = "Get list of all restaurants")
    public ResponseEntity<List<RestaurantDto>> getAllRestaurants() {
        return ResponseEntity.ok(restaurantService.getAllRestaurants());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get restaurant details by ID")
    public ResponseEntity<RestaurantDto> getRestaurantById(@PathVariable Long id) {
        return ResponseEntity.ok(restaurantService.getRestaurantById(id));
    }

    @GetMapping("/{id}/dishes")
    @Operation(summary = "Get popular dishes for a specific restaurant")
    public ResponseEntity<List<DishDto>> getDishesForRestaurant(@PathVariable Long id) {
        return ResponseEntity.ok(restaurantService.getDishesForRestaurant(id));
    }

    @GetMapping("/mood/{mood}")
    @Operation(summary = "Get curated restaurants matching a specific mood")
    public ResponseEntity<List<RestaurantDto>> getRestaurantsByMood(@PathVariable String mood) {
        return ResponseEntity.ok(restaurantService.getRestaurantsByMood(mood));
    }
}
