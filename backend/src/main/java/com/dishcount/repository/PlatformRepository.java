package com.dishcount.repository;

import com.dishcount.entity.Platform;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PlatformRepository extends JpaRepository<Platform, Long> {
    List<Platform> findByActiveTrue();
    Optional<Platform> findByNameIgnoreCase(String name);
}
