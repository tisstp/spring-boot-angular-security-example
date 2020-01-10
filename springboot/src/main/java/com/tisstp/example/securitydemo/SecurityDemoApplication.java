package com.tisstp.example.securitydemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.core.env.Environment;


@SpringBootApplication
public class SecurityDemoApplication extends SpringBootServletInitializer implements CommandLineRunner {

  @Autowired
  private Environment env;

  public static void main(String[] args) {
    SpringApplication.run(SecurityDemoApplication.class, args);
  }

  @Override
  public void run(String... args) throws Exception {
    System.out.println(String.format("Server port(property): %s", env.getProperty("server.port")));
  }

}
