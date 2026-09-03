package com.dishcount.controller;

import com.dishcount.dto.PlatformDto;
import com.dishcount.service.PlatformService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/platforms")
@Tag(name = "Platforms", description = "Supported food delivery platform metadata")
public class PlatformController {

    private final PlatformService platformService;

    public PlatformController(PlatformService platformService) {
        this.platformService = platformService;
    }

    @GetMapping
    @Operation(summary = "Get list of active food platforms (Swiggy, Zomato, EatSure, SWISH, Magicpin, Foodpanda, Uber Eats)")
    public ResponseEntity<List<PlatformDto>> getAllPlatforms() {
        return ResponseEntity.ok(platformService.getAllPlatforms());
    }
}
