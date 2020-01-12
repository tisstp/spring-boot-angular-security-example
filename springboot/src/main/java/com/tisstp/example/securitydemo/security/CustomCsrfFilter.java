package com.tisstp.example.securitydemo.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.extern.log4j.Log4j2;

/**
 * @author sathaphorn.stp (Tis)
 * @since 12-01-2020, 8:42 PM
 */
@Log4j2
public class CustomCsrfFilter extends OncePerRequestFilter {

  public static final String CSRF_COOKIE_NAME = "XSRF-TOKEN";

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
    throws ServletException, IOException {
    log.debug("Method doFilterInternal: start");

    CsrfToken csrf = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
    if (csrf != null) {
      log.info(String.format("token: %s", csrf.getToken()));
      Cookie cookie = new Cookie(CSRF_COOKIE_NAME, csrf.getToken());
      cookie.setHttpOnly(false);
      cookie.setPath("/");
      response.addCookie(cookie);
    }
    filterChain.doFilter(request, response);
  }

}
