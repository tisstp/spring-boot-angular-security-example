package com.tisstp.example.securitydemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.core.env.Environment;

import lombok.extern.log4j.Log4j2;


@Log4j2
@SpringBootApplication
public class SecurityDemoApplication extends SpringBootServletInitializer implements CommandLineRunner {

  @Autowired
  private Environment env;

  public static void main(String[] args) {
    SpringApplication.run(SecurityDemoApplication.class, args);
  }

  @Override
  public void run(String... args) throws Exception {
    String profile = env.getProperty("spring.profiles.active");
    String port = env.getProperty("server.port");
    String context = env.getProperty("server.servlet.context-path");
    String h2Enabled = env.getProperty("spring.h2.console.enabled");

    log.info(String.format("Profile active: %s", profile));
    log.info(String.format("Server port(property): %s", port));
    log.info(String.format("Security enable-csrf: %s", env.getProperty("security.enable-csrf")));
    log.info(String.format("Database H2 enabled: %s", h2Enabled));
    if ("true".equals(h2Enabled)) {
      log.info(String.format("H2 console: http://localhost:%s%s/h2-console", port, context));
    }
  }

}
