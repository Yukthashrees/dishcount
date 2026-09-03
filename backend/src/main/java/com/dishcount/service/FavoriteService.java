package com.dishcount.service;

import com.dishcount.dto.FavoriteRequestDto;
import com.dishcount.entity.Dish;
import com.dishcount.entity.Favorite;
import com.dishcount.entity.Restaurant;
import com.dishcount.entity.User;
import com.dishcount.exception.ResourceNotFoundException;
import com.dishcount.repository.DishRepository;
import com.dishcount.repository.FavoriteRepository;
import com.dishcount.repository.RestaurantRepository;
import com.dishcount.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final DishRepository dishRepository;

    public FavoriteService(FavoriteRepository favoriteRepository, UserRepository userRepository, RestaurantRepository restaurantRepository, DishRepository dishRepository) {
        this.favoriteRepository = favoriteRepository;
        this.userRepository = userRepository;
        this.restaurantRepository = restaurantRepository;
        this.dishRepository = dishRepository;
    }

    public List<Favorite> getUserFavorites(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
        return favoriteRepository.findByUserId(user.getId());
    }

    public Favorite addFavorite(String email, FavoriteRequestDto request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));

        Restaurant restaurant = request.getRestaurantId() != null 
                ? restaurantRepository.findById(request.getRestaurantId()).orElse(null) 
                : null;

        Dish dish = request.getDishId() != null 
                ? dishRepository.findById(request.getDishId()).orElse(null) 
                : null;

        Favorite favorite = Favorite.builder()
                .user(user)
                .restaurant(restaurant)
                .dish(dish)
                .build();

        return favoriteRepository.save(favorite);
    }

    @Transactional
    public void removeFavorite(String email, Long id) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
        favoriteRepository.deleteByUserIdAndId(user.getId(), id);
    }
}
