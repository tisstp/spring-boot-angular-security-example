package com.tisstp.example.securitydemo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;

import com.tisstp.example.securitydemo.security.CustomBasicAuthFilter;
import com.tisstp.example.securitydemo.security.CustomCsrfFilter;
import com.tisstp.example.securitydemo.security.MyBasicAuthenticationEntryPoint;
import lombok.extern.log4j.Log4j2;

/**
 * @author sathaphorn.stp (Tis)
 * @since 10-01-2020, 11:24 PM
 */
@Log4j2
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  private static final String[] CSRF_IGNORE = {"/auth"};

  @Value("${security.enable-csrf:true}") // todo add in yaml file
  private boolean csrfEnabled = true;

  @Autowired
  private MyBasicAuthenticationEntryPoint authenticationEntryPoint;


  /**
   * mock user data in memory
   */
  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    auth
      .inMemoryAuthentication()
      .withUser("user1")
      .password(passwordEncoder().encode("user1Pass"))
      .authorities("ROLE_USER");
  }

  /**
   * angular app use: btoa(username:password)
   */
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
      .httpBasic().authenticationEntryPoint(authenticationEntryPoint)
      .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and().authorizeRequests()
      .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
      .antMatchers(CSRF_IGNORE).permitAll()
      .anyRequest().authenticated();

    log.debug(String.format("CSRF: %s", csrfEnabled ? "enabled" : "disabled"));
    if (!csrfEnabled) {
      http.csrf().disable();
    } else {
      http
        .csrf()
        .ignoringAntMatchers(CSRF_IGNORE) // URI where CSRF check will not be applied
        .csrfTokenRepository(csrfTokenRepository()); // defines a repository where tokens are stored
    }

    // Custom security filter
    http
      .addFilterAfter(new CustomCsrfFilter(), CsrfFilter.class) // Csrf filter in which we will add the cookie
      .addFilterAfter(new CustomBasicAuthFilter(), BasicAuthenticationFilter.class);

    // disable page caching
    http.headers().cacheControl();
  }

  private CsrfTokenRepository csrfTokenRepository() {
    CookieCsrfTokenRepository result = new CookieCsrfTokenRepository();
    result.setCookieName(CustomCsrfFilter.CSRF_COOKIE_NAME);
    result.setCookieHttpOnly(false);
    result.setCookiePath("/");
    return result;
  }

}
