package com.example.server.controller;

import com.example.server.util.CookieUtil;
import com.example.server.dto.request.LoginRequest;
import com.example.server.dto.request.SignupRequest;
import com.example.server.dto.response.JwtResponse;
import com.example.server.dto.response.MessageResponse;
import com.example.server.dto.response.UserResponse;
import com.example.server.entity.RefreshToken;
import com.example.server.entity.Role;
import com.example.server.entity.User;
import com.example.server.entity.ERole;
import com.example.server.config.security.jwt.JwtTokenProvider;
import com.example.server.exception.TokenRefreshException;
import com.example.server.repository.UserRepository;
import com.example.server.service.RefreshTokenService;
import com.example.server.service.RoleService;
import com.example.server.service.UserService;
import com.example.server.service.impl.CustomUserDetailImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Value("${jwt.jwtExpirationMs}")
    private Integer jwtExpirationInMs;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RefreshTokenService refreshTokenService;


    @PostMapping("/auth/sign-in")
    public ResponseEntity<Object> authenticateUser(HttpServletResponse httpServletResponse, @Validated @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtTokenProvider.generateJwtToken(authentication);

        CustomUserDetailImpl customUserDetail = (CustomUserDetailImpl) authentication.getPrincipal();

        List<String> roles = customUserDetail.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(customUserDetail.getId());

        CookieUtil.create(httpServletResponse, "accessToken", jwt, false, jwtExpirationInMs, null);
        CookieUtil.create(httpServletResponse, "refreshToken", refreshToken.getToken(), false, jwtExpirationInMs, null);

        return ResponseEntity.ok(new JwtResponse(jwt,
                refreshToken.getToken(),
                customUserDetail.getId(),
                customUserDetail.getUsername(),
                customUserDetail.getPassword(),
                customUserDetail.getEmail(),
                roles));
    }

    @PostMapping("/auth/sign-up")
    public ResponseEntity<?> registerAuth(@Validated @RequestBody SignupRequest signupRequest) {
        System.out.println(signupRequest.getUsername() + " " + signupRequest.getEmail());
        if (userService.checkExistUsername(signupRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userService.checkExistEmail(signupRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        User user = new User(signupRequest.getUsername(), signupRequest.getEmail(), passwordEncoder.encode(signupRequest.getPassword()));
        System.out.println(user);

        Set<String> strRoles = signupRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleService.findByName(ERole.ROLE_USER).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleService.findByName(ERole.ROLE_ADMIN).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
                        roles.add(adminRole);
                        break;
                    case "mod":
                        Role modRole = roleService.findByName(ERole.ROLE_MODERATOR).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
                        roles.add(modRole);
                        break;
                    default:
                        Role userRole = roleService.findByName(ERole.ROLE_USER).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
                        roles.add(userRole);
                        break;
                }
            });
        }
        user.setRoles(roles);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User registered successfully"));
    }

    @PostMapping("/auth/sign-out")
    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
        CookieUtil.clear(response, "accessToken");
        CookieUtil.clear(response, "refreshToken");

        return ResponseEntity.ok(new MessageResponse("Log out successful!"));
    }

    @GetMapping("/token/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = CookieUtil.read(request, "refreshToken");

        if ((refreshToken != null) && (refreshToken.length() > 0)) {

            return refreshTokenService.findByToken(refreshToken)
                    .map(refreshTokenService::verifyExpiration)
                    .map(RefreshToken::getUser)
                    .map(user -> {

                        String accessToken = jwtTokenProvider.generateTokenFromUsername(user.getUsername());

                        RefreshToken token = refreshTokenService.createRefreshToken(user.getId());

                        CookieUtil.create(response, "accessToken", accessToken, false, jwtExpirationInMs, null);
                        CookieUtil.create(response, "refreshToken", token.getToken(), false, jwtExpirationInMs, null);

                        return ResponseEntity.ok()
                                .body(new MessageResponse("Token is refreshed successfully!"));
                    })
                    .orElseThrow(() -> new TokenRefreshException(refreshToken,
                            "Refresh token is not in database!"));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Refresh Token is empty!"));
    }


    @GetMapping("/user")
    public ResponseEntity<?> getUser(HttpServletResponse httpServletResponse) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        SecurityContextHolder.getContext().setAuthentication(authentication);

        CustomUserDetailImpl customUserDetail = (CustomUserDetailImpl) authentication.getPrincipal();

        List<String> roles = customUserDetail.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new UserResponse(
                customUserDetail.getId(),
                customUserDetail.getUsername(),
                customUserDetail.getEmail(),
                customUserDetail.getPassword(),
                roles));
    }

    @GetMapping("/admin")
    public String admin() {
        return "ADMIN";
    }


}
