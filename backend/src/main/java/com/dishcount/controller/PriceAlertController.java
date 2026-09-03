package com.dishcount.controller;

import com.dishcount.dto.PriceAlertRequestDto;
import com.dishcount.entity.PriceAlert;
import com.dishcount.service.PriceAlertService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/price-alerts")
@Tag(name = "Price Alerts", description = "Target price notification alerts management")
public class PriceAlertController {

    private final PriceAlertService priceAlertService;

    public PriceAlertController(PriceAlertService priceAlertService) {
        this.priceAlertService = priceAlertService;
    }

    @GetMapping
    @Operation(summary = "Get user's configured price drop alerts")
    public ResponseEntity<List<PriceAlert>> getPriceAlerts(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(priceAlertService.getUserPriceAlerts(userDetails.getUsername()));
    }

    @PostMapping
    @Operation(summary = "Create a price alert when a dish falls below a target price")
    public ResponseEntity<PriceAlert> createPriceAlert(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody PriceAlertRequestDto request
    ) {
        return ResponseEntity.ok(priceAlertService.createPriceAlert(userDetails.getUsername(), request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a price alert")
    public ResponseEntity<Void> deletePriceAlert(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id
    ) {
        priceAlertService.deletePriceAlert(userDetails.getUsername(), id);
        return ResponseEntity.noContent().build();
    }
}
