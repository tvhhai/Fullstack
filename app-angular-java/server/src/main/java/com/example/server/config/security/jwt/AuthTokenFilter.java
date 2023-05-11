package com.example.server.config.security.jwt;

import com.example.server.service.impl.UserServiceImpl;
import com.example.server.util.CookieUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;


import java.io.IOException;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Component
@Slf4j
public class AuthTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    AuthenticationManager authenticationManager;

    @Override // authentication and authorization
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {

            String jwt = CookieUtil.read(request, "accessToken");

            if (jwt != null && jwtTokenProvider.validateToken(jwt)) {
                String userName = jwtTokenProvider.getUsernameFromToken(jwt);

                checkRefreshToken(response, jwt);

                UserDetails userDetails = userServiceImpl.loadUserByUsername(userName);
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities());
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        } catch (Exception e) {
            log.error("Cannot set user authentication: {}", e);
        }

        filterChain.doFilter(request, response);
    }

    private void checkRefreshToken(HttpServletResponse response, String accessToken) {
        Date expirationDate = jwtTokenProvider.getExpirationDateFromToken(accessToken);
        Date currentDate = new Date();

        long timeDiff = expirationDate.getTime() - currentDate.getTime();
        long minutesDiff = TimeUnit.MILLISECONDS.toMinutes(timeDiff);

        log.info("Time remaining until token expiration: " + minutesDiff + " minutes");

        if (timeDiff <= TimeUnit.MINUTES.toMillis(5)) {
            jwtTokenProvider.refreshToken(response);
        }
    }
}