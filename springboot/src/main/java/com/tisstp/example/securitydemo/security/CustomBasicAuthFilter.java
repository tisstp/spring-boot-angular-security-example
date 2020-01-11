package com.tisstp.example.securitydemo.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.springframework.web.filter.GenericFilterBean;

import lombok.extern.log4j.Log4j2;

/**
 * @author sathaphorn.stp (Tis)
 * @since 11-01-2020, 6:14 PM
 */
@Log4j2
public class CustomBasicAuthFilter extends GenericFilterBean {

  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
    throws IOException, ServletException {

    log.debug("Basic Auth Fileter: start");
    // todo implements...
    chain.doFilter(request, response);
  }

}
