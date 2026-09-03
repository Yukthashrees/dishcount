package com.dishcount.service;

import com.dishcount.dto.PlatformDto;
import com.dishcount.repository.PlatformRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlatformService {

    private final PlatformRepository platformRepository;

    public PlatformService(PlatformRepository platformRepository) {
        this.platformRepository = platformRepository;
    }

    public List<PlatformDto> getAllPlatforms() {
        return platformRepository.findAll().stream()
                .map(p -> PlatformDto.builder()
                        .id(p.getId())
                        .name(p.getName())
                        .logoUrl(p.getLogoUrl())
                        .deepLinkBaseUrl(p.getDeepLinkBaseUrl())
                        .active(p.getActive())
                        .primaryColor(p.getPrimaryColor())
                        .build())
                .collect(Collectors.toList());
    }
}
