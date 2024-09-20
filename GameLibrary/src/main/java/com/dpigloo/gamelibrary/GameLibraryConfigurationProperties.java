package com.dpigloo.gamelibrary;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("gamelibrary")
public record GameLibraryConfigurationProperties(
        String igdbClientId,
        String igdbClientSecret) {
}
