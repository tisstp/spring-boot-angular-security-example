package com.tisstp.example.securitydemo.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.extern.log4j.Log4j2;

/**
 * @author sathaphorn.stp (Tis)
 * @since 11-01-2020, 1:51 PM
 *
 * CORS (Cross-Origin Resource Sharing) header.
 */
@Log4j2
@Configuration
public class CorsConfig {

  @Value("${management.endpoints.web.cors.allowed-origins}")
  private String[] allowOrigins;

  /**
   * Global CORS configuration : Access-Control-Allow-Origin: https://amazing.site read docs:
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSMissingAllowOrigin
   *
   * @return WebMvcConfigurer
   */
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    log.debug("CORS Configurer: start");
    log.debug(String.format("CORS Allow Origin: %s", Arrays.toString(allowOrigins)));
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry
          .addMapping("/**")
          .allowedOrigins(allowOrigins);
      }
    };
  }

  @Bean
  public CorsFilter corsFilter() {
    log.debug("CORS Filter: start");
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowCredentials(true);
    config.addAllowedOrigin("*");
    config.addAllowedHeader("*");
    config.addAllowedMethod("OPTIONS");
    config.addAllowedMethod("GET");
    config.addAllowedMethod("POST");
    config.addAllowedMethod("PUT");
    config.addAllowedMethod("PATCH");
    config.addAllowedMethod("DELETE");
    source.registerCorsConfiguration("/**", config);
    return new CorsFilter(source);
  }

}
