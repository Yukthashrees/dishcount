package com.dishcount.service;

import com.dishcount.dto.PriceAlertRequestDto;
import com.dishcount.entity.Dish;
import com.dishcount.entity.PriceAlert;
import com.dishcount.entity.User;
import com.dishcount.exception.ResourceNotFoundException;
import com.dishcount.repository.DishRepository;
import com.dishcount.repository.PriceAlertRepository;
import com.dishcount.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class PriceAlertService {

    private final PriceAlertRepository priceAlertRepository;
    private final UserRepository userRepository;
    private final DishRepository dishRepository;

    public PriceAlertService(PriceAlertRepository priceAlertRepository, UserRepository userRepository, DishRepository dishRepository) {
        this.priceAlertRepository = priceAlertRepository;
        this.userRepository = userRepository;
        this.dishRepository = dishRepository;
    }

    public List<PriceAlert> getUserPriceAlerts(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
        return priceAlertRepository.findByUserId(user.getId());
    }

    public PriceAlert createPriceAlert(String email, PriceAlertRequestDto request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));

        Dish dish = dishRepository.findById(request.getDishId())
                .orElseThrow(() -> new ResourceNotFoundException("Dish not found: " + request.getDishId()));

        PriceAlert alert = PriceAlert.builder()
                .user(user)
                .dish(dish)
                .targetPrice(request.getTargetPrice())
                .active(true)
                .build();

        return priceAlertRepository.save(alert);
    }

    @Transactional
    public void deletePriceAlert(String email, Long id) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
        priceAlertRepository.deleteByUserIdAndId(user.getId(), id);
    }
}
