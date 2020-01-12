package com.tisstp.example.securitydemo.security;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/**
 * @author sathaphorn.stp (Tis)
 * @since 11-01-2020, 5:59 PM
 *
 * Handle Authentication for error unauthorized (status code 401)
 */
@Component
public class MyBasicAuthenticationEntryPoint extends BasicAuthenticationEntryPoint {

  @Override
  public void afterPropertiesSet() {
    setRealmName("Baeldung");
    super.afterPropertiesSet();
  }

  @Override
  public void commence(final HttpServletRequest request, final HttpServletResponse response,
    final AuthenticationException authException) throws IOException {
    response.addHeader("WWW-Authenticate", "Basic realm=\"" + getRealmName() + "\"");
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    final PrintWriter writer = response.getWriter();
    writer.println("HTTP Status " + HttpServletResponse.SC_UNAUTHORIZED + " - " + authException.getMessage());
  }

}
