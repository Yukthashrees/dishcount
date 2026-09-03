package com.dishcount.controller;

import com.dishcount.dto.PriceHistoryDto;
import com.dishcount.service.PriceHistoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/price-history")
@Tag(name = "Price History", description = "Historical price trends (7D, 30D, 90D)")
public class PriceHistoryController {

    private final PriceHistoryService priceHistoryService;

    public PriceHistoryController(PriceHistoryService priceHistoryService) {
        this.priceHistoryService = priceHistoryService;
    }

    @GetMapping("/{dishId}")
    @Operation(summary = "Get historical price trend data points for a specific dish")
    public ResponseEntity<PriceHistoryDto> getPriceHistory(
            @PathVariable Long dishId,
            @RequestParam(name = "days", required = false, defaultValue = "30") Integer days
    ) {
        return ResponseEntity.ok(priceHistoryService.getPriceHistory(dishId, days));
    }
}
