package com.dishcount.controller;

import com.dishcount.dto.FavoriteRequestDto;
import com.dishcount.entity.Favorite;
import com.dishcount.service.FavoriteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/favorites")
@Tag(name = "Favorites", description = "User saved favorites management")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping
    @Operation(summary = "Get current authenticated user's saved favorites")
    public ResponseEntity<List<Favorite>> getFavorites(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(favoriteService.getUserFavorites(userDetails.getUsername()));
    }

    @PostMapping
    @Operation(summary = "Add a dish or restaurant to favorites")
    public ResponseEntity<Favorite> addFavorite(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody FavoriteRequestDto request
    ) {
        return ResponseEntity.ok(favoriteService.addFavorite(userDetails.getUsername(), request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Remove an item from favorites")
    public ResponseEntity<Void> removeFavorite(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id
    ) {
        favoriteService.removeFavorite(userDetails.getUsername(), id);
        return ResponseEntity.noContent().build();
    }
}
