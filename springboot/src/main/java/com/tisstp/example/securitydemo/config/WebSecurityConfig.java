package com.tisstp.example.securitydemo.config;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;

//import com.tisstp.example.securitydemo.security.CustomCsrfFilter;
import com.tisstp.example.securitydemo.security.CustomCsrfFilter;
import com.tisstp.example.securitydemo.security.CustomBasicAuthFilter;
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
      .csrf().disable() // csrf config starts here
//      .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
//      .ignoringAntMatchers(CSRF_IGNORE) // URI where CSRF check will not be applied
//      .csrfTokenRepository(csrfTokenRepository()) // defines a repository where tokens are stored
//      .and()
      .httpBasic().authenticationEntryPoint(authenticationEntryPoint)
      .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    http
      .authorizeRequests()
      .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
      .antMatchers(CSRF_IGNORE).permitAll()
      .anyRequest().authenticated()
    ;

    // Custom security filter
    http
      .addFilterAfter(new CustomBasicAuthFilter(), BasicAuthenticationFilter.class);
//      .addFilterAfter(new CustomCsrfFilter(), CsrfFilter.class); // Csrf filter in which we will add the cookie;

    // disable page caching
    http.headers().cacheControl().disable();
  }

  private CsrfTokenRepository csrfTokenRepository() {
    HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
    repository.setHeaderName(CustomCsrfFilter.CSRF_COOKIE_NAME);
    return repository;
  }

}
