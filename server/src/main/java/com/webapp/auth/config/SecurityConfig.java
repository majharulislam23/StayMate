package com.webapp.auth.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.webapp.auth.security.JwtAuthenticationFilter;
import com.webapp.auth.security.oauth2.CustomOAuth2UserService;
import com.webapp.auth.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.webapp.auth.security.oauth2.OAuth2AuthenticationFailureHandler;
import com.webapp.auth.security.oauth2.OAuth2AuthenticationSuccessHandler;

import lombok.extern.slf4j.Slf4j;

/**
 * Security Configuration for StayMate.
 *
 * Supports two modes:
 * 1. WITH OAuth2 (default): Full Google OAuth2 + JWT authentication
 * 2. WITHOUT OAuth2: JWT-only authentication (when GOOGLE_CLIENT_ID is
 * "disabled" or missing)
 *
 * The configuration automatically detects which mode to use based on whether
 * ClientRegistrationRepository is available.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@Slf4j
public class SecurityConfig {

        private final JwtAuthenticationFilter jwtAuthenticationFilter;
        private final UserDetailsService userDetailsService;
        private final PasswordEncoder passwordEncoder;
        private final RateLimitFilter rateLimitFilter;

        // OAuth2 components - optional, may not be present if OAuth2 is disabled
        @Autowired(required = false)
        private CustomOAuth2UserService customOAuth2UserService;

        @Autowired(required = false)
        private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

        @Autowired(required = false)
        private OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

        @Autowired(required = false)
        private HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

        @Autowired(required = false)
        private ClientRegistrationRepository clientRegistrationRepository;

        @Value("${cors.allowed-origins:http://localhost:3000,http://localhost:8080}")
        private String allowedOriginsConfig;

        public SecurityConfig(
                        @Lazy JwtAuthenticationFilter jwtAuthenticationFilter,
                        @Lazy UserDetailsService userDetailsService,
                        PasswordEncoder passwordEncoder,
                        RateLimitFilter rateLimitFilter) {
                this.jwtAuthenticationFilter = jwtAuthenticationFilter;
                this.userDetailsService = userDetailsService;
                this.passwordEncoder = passwordEncoder;
                this.rateLimitFilter = rateLimitFilter;
        }

        @Bean
        @Primary
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                log.info("Configuring Security Filter Chain...");

                // Base configuration
                http
                                .csrf(AbstractHttpConfigurer::disable)
                                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authorizeHttpRequests(auth -> auth
                                                // Public endpoints - no authentication required
                                                .requestMatchers(
                                                                "/api/auth/register",
                                                                "/api/auth/login",
                                                                "/api/auth/refresh-token",
                                                                "/api/auth/check-email",
                                                                "/oauth2/**",
                                                                "/login/oauth2/**",
                                                                "/login/**",
                                                                "/api/public/**",
                                                                "/actuator/health",
                                                                "/ws/**",
                                                                "/h2-console/**",
                                                                "/error",
                                                                "/api/uploads/**",
                                                                "/api/v1/internal/sudo/**",
                                                                "/api/properties/**",
                                                                "/api/roommates/**")
                                                .permitAll()
                                                // Admin only endpoints
                                                .requestMatchers("/api/admin/**")
                                                .hasRole("ADMIN")
                                                // House owner endpoints
                                                .requestMatchers("/api/house-owner/**")
                                                .hasAnyRole("HOUSE_OWNER", "ADMIN")
                                                // User endpoints
                                                .requestMatchers("/api/users/**")
                                                .authenticated()
                                                // Auth endpoints requiring authentication
                                                .requestMatchers(
                                                                "/api/auth/me",
                                                                "/api/auth/logout",
                                                                "/api/auth/validate",
                                                                "/api/auth/select-role")
                                                .authenticated()
                                                // All other endpoints require authentication
                                                .anyRequest()
                                                .authenticated());

                // Conditionally add OAuth2 login if ClientRegistrationRepository is available
                if (clientRegistrationRepository != null && isOAuth2Configured()) {
                        log.info("OAuth2 is configured - enabling Google login");
                        http.oauth2Login(oauth2 -> oauth2
                                        .authorizationEndpoint(authorization -> authorization
                                                        .baseUri("/oauth2/authorization")
                                                        .authorizationRequestRepository(
                                                                        httpCookieOAuth2AuthorizationRequestRepository))
                                        .redirectionEndpoint(redirection -> redirection
                                                        .baseUri("/login/oauth2/code/*"))
                                        .userInfoEndpoint(userInfo -> userInfo
                                                        .userService(customOAuth2UserService))
                                        .successHandler(oAuth2AuthenticationSuccessHandler)
                                        .failureHandler(oAuth2AuthenticationFailureHandler));
                } else {
                        log.warn("OAuth2 is NOT configured - Google login disabled. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable.");
                }

                // Add filters
                http
                                .authenticationProvider(authenticationProvider())
                                .addFilterBefore(rateLimitFilter, UsernamePasswordAuthenticationFilter.class)
                                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                                .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()));

                return http.build();
        }

        /**
         * Check if OAuth2 is actually configured with real credentials.
         * Returns false if the client-id is "disabled" or empty.
         */
        private boolean isOAuth2Configured() {
                if (clientRegistrationRepository == null) {
                        return false;
                }
                try {
                        var registration = clientRegistrationRepository.findByRegistrationId("google");
                        if (registration == null) {
                                return false;
                        }
                        String clientId = registration.getClientId();
                        return clientId != null && !clientId.isEmpty() && !clientId.equals("disabled");
                } catch (Exception e) {
                        log.debug("OAuth2 not configured: {}", e.getMessage());
                        return false;
                }
        }

        @Bean
        public AuthenticationProvider authenticationProvider() {
                DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
                authProvider.setUserDetailsService(userDetailsService);
                authProvider.setPasswordEncoder(passwordEncoder);
                return authProvider;
        }

        @Bean
        public AuthenticationManager authenticationManager(
                        AuthenticationConfiguration config) throws Exception {
                return config.getAuthenticationManager();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                List<String> allowedOrigins = Arrays.asList(allowedOriginsConfig.split(","));
                configuration.setAllowedOrigins(allowedOrigins);
                configuration.setAllowedMethods(
                                Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
                configuration.setAllowedHeaders(
                                Arrays.asList(
                                                "Authorization",
                                                "Content-Type",
                                                "X-Requested-With",
                                                "Accept",
                                                "Origin",
                                                "Access-Control-Request-Method",
                                                "Access-Control-Request-Headers",
                                                "X-Admin-Secret"));
                configuration.setExposedHeaders(
                                Arrays.asList(
                                                "Access-Control-Allow-Origin",
                                                "Access-Control-Allow-Credentials",
                                                "Authorization"));
                configuration.setAllowCredentials(true);
                configuration.setMaxAge(3600L);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }
}
