package com.dishcount.controller;

import com.dishcount.dto.GroupOrderRequestDto;
import com.dishcount.dto.GroupOrderResponseDto;
import com.dishcount.service.GroupOrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/group-order")
@Tag(name = "Group Order Calculator", description = "Multi-item group order total price comparison across platforms")
public class GroupOrderController {

    private final GroupOrderService groupOrderService;

    public GroupOrderController(GroupOrderService groupOrderService) {
        this.groupOrderService = groupOrderService;
    }

    @PostMapping("/compare")
    @Operation(summary = "Calculate group order totals across platforms for multiple dishes & quantities")
    public ResponseEntity<GroupOrderResponseDto> compareGroupOrder(@Valid @RequestBody GroupOrderRequestDto request) {
        return ResponseEntity.ok(groupOrderService.calculateGroupOrder(request));
    }
}
