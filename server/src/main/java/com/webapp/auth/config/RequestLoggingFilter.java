package com.webapp.auth.config;

import java.io.IOException;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Request logging filter for debugging and monitoring.
 * Adds request ID to MDC for correlation and logs request/response details.
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class RequestLoggingFilter extends OncePerRequestFilter {

  private static final Logger log = LoggerFactory.getLogger(RequestLoggingFilter.class);

  @Override
  protected void doFilterInternal(
      HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {

    // Skip logging for static resources and health checks
    String path = request.getRequestURI();
    if (isExcludedPath(path)) {
      filterChain.doFilter(request, response);
      return;
    }

    // Generate request ID for correlation
    String requestId = UUID.randomUUID().toString().substring(0, 8);
    String clientIp = getClientIp(request);

    // Add to MDC for structured logging
    MDC.put("requestId", requestId);
    MDC.put("clientIp", clientIp);

    // Add request ID header for client-side correlation
    response.setHeader("X-Request-ID", requestId);

    long startTime = System.currentTimeMillis();

    try {
      log.info("→ {} {} from {} [{}]",
          request.getMethod(),
          path,
          clientIp,
          requestId);

      filterChain.doFilter(request, response);

    } finally {
      long duration = System.currentTimeMillis() - startTime;

      log.info("← {} {} → {} ({}ms) [{}]",
          request.getMethod(),
          path,
          response.getStatus(),
          duration,
          requestId);

      // Log slow requests as warnings
      if (duration > 3000) {
        log.warn("Slow request detected: {} {} took {}ms [{}]",
            request.getMethod(),
            path,
            duration,
            requestId);
      }

      // Clear MDC
      MDC.remove("requestId");
      MDC.remove("clientIp");
    }
  }

  private String getClientIp(HttpServletRequest request) {
    String forwardedFor = request.getHeader("X-Forwarded-For");
    if (forwardedFor != null && !forwardedFor.isEmpty()) {
      return forwardedFor.split(",")[0].trim();
    }

    String realIp = request.getHeader("X-Real-IP");
    if (realIp != null && !realIp.isEmpty()) {
      return realIp;
    }

    return request.getRemoteAddr();
  }

  private boolean isExcludedPath(String path) {
    return path.startsWith("/actuator") ||
        path.startsWith("/swagger") ||
        path.startsWith("/v3/api-docs") ||
        path.startsWith("/favicon") ||
        path.endsWith(".css") ||
        path.endsWith(".js") ||
        path.endsWith(".ico") ||
        path.endsWith(".png") ||
        path.endsWith(".jpg");
  }
}
