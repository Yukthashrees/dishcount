package com.dishcount.controller;

import com.dishcount.dto.SearchResponseDto;
import com.dishcount.service.SearchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/search")
@Tag(name = "Search", description = "Intelligent search for restaurants, dishes, cuisines, and categories")
public class SearchController {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    @Operation(summary = "Search dishes and restaurants by query string")
    public ResponseEntity<SearchResponseDto> search(@RequestParam(name = "q", defaultValue = "") String query) {
        return ResponseEntity.ok(searchService.search(query));
    }
}
