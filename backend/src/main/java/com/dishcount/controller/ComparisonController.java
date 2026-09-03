package com.dishcount.controller;

import com.dishcount.dto.ComparisonResponseDto;
import com.dishcount.service.ComparisonService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Comparison & Redirect Engine", description = "Core true price calculation, multi-platform comparison, and platform redirect link issuer")
public class ComparisonController {

    private final ComparisonService comparisonService;

    public ComparisonController(ComparisonService comparisonService) {
        this.comparisonService = comparisonService;
    }

    @GetMapping("/compare")
    @Operation(summary = "Compare true final prices across all active food platforms for a dish/restaurant")
    public ResponseEntity<ComparisonResponseDto> comparePrices(
            @RequestParam(name = "dishId", required = false, defaultValue = "1") Long dishId,
            @RequestParam(name = "restaurantId", required = false, defaultValue = "1") Long restaurantId,
            @RequestParam(name = "location", required = false, defaultValue = "Bengaluru") String location
    ) {
        return ResponseEntity.ok(comparisonService.comparePrices(dishId, restaurantId, location));
    }

    @GetMapping("/redirect/{comparisonId}/{platformId}")
    @Operation(summary = "Issue authorized deep-link redirect to the selected platform for order completion")
    public ResponseEntity<Map<String, String>> redirect(
            @PathVariable Long comparisonId,
            @PathVariable String platformId
    ) {
        String targetUrl = "https://" + platformId.toLowerCase() + ".com";
        if ("magicpin".equalsIgnoreCase(platformId)) {
            targetUrl = "https://magicpin.in";
        } else if ("swish".equalsIgnoreCase(platformId)) {
            targetUrl = "https://swish.app";
        }

        return ResponseEntity.ok(Map.of(
                "comparisonId", String.valueOf(comparisonId),
                "platformId", platformId,
                "redirectUrl", targetUrl,
                "message", "Authorized deep-link generated for " + platformId
        ));
    }
}
