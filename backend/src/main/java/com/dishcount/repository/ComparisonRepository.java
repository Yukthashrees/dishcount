package com.dishcount.repository;

import com.dishcount.entity.Comparison;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComparisonRepository extends JpaRepository<Comparison, Long> {
}
