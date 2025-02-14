package com.dpigloo.gamelibrary.configurations;

import org.jetbrains.annotations.NotNull;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.web.servlet.resource.ResourceResolverChain;

import java.util.List;


import jakarta.servlet.http.HttpServletRequest;

import static java.util.Objects.nonNull;

@Configuration
public class SpringConfiguration implements WebMvcConfigurer {

  @Override
  public void addResourceHandlers(@NotNull ResourceHandlerRegistry registry) {
    this.serveDirectory(registry, "/", "classpath:/static/");
  }

  private void serveDirectory(ResourceHandlerRegistry registry, String endpoint, String location) {
    //
    String[] endpointPatterns = endpoint.endsWith("/")
            ? new String[]{endpoint.substring(0, endpoint.length() - 1), endpoint, endpoint + "**"}
            : new String[]{endpoint, endpoint + "/", endpoint + "/**"};
    registry
            .addResourceHandler(endpointPatterns)
            .addResourceLocations(location.endsWith("/") ? location : location + "/")
            .resourceChain(false)
            .addResolver(new PathResourceResolver() {
              @Override
              public Resource resolveResource(HttpServletRequest request, @NotNull String requestPath, @NotNull List<? extends Resource> locations, @NotNull ResourceResolverChain chain) {
                Resource resource = super.resolveResource(request, requestPath, locations, chain);
                if (nonNull(resource)) {
                  return resource;
                }
                return super.resolveResource(request, "/index.html", locations, chain);
              }
            });
  }
}
