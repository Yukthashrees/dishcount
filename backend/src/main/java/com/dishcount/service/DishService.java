package com.dishcount.service;

import com.dishcount.dto.DishDto;
import com.dishcount.entity.Dish;
import com.dishcount.exception.ResourceNotFoundException;
import com.dishcount.repository.DishRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DishService {

    private final DishRepository dishRepository;

    public DishService(DishRepository dishRepository) {
        this.dishRepository = dishRepository;
    }

    public List<DishDto> getAllDishes() {
        return dishRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public DishDto getDishById(Long id) {
        Dish dish = dishRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Dish not found with id: " + id));
        return mapToDto(dish);
    }

    private DishDto mapToDto(Dish d) {
        return DishDto.builder()
                .id(d.getId())
                .name(d.getName())
                .description(d.getDescription())
                .category(d.getCategory())
                .basePrice(d.getBasePrice())
                .imageUrl(d.getImageUrl())
                .rating(d.getRating())
                .build();
    }
}
