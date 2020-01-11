package com.tisstp.example.securitydemo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;

import com.tisstp.example.securitydemo.security.CustomCsrfFilter;
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

  private static final String[] CSRF_IGNORE = {"/signin/**", "/signup/**"};

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
      .httpBasic()
      .and().csrf() // csrf config starts here
      .ignoringAntMatchers(CSRF_IGNORE) // URI where CSRF check will not be applied
      .csrfTokenRepository(csrfTokenRepository()) // defines a repository where tokens are stored
      .and()
      .addFilterAfter(new CustomCsrfFilter(), CsrfFilter.class) // Csrf filter in which we will add the cookie
      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    http
      .authorizeRequests()
      .antMatchers(HttpMethod.OPTIONS, "/**").permitAll();

    // disable page caching
    http.headers().cacheControl().disable();
  }

  private CsrfTokenRepository csrfTokenRepository() {
    HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
    repository.setHeaderName(CustomCsrfFilter.CSRF_COOKIE_NAME);
    return repository;
  }

}
