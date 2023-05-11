package com.example.server.controller;

import com.example.server.dto.response.ErrorMessage;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Value("${jwt.jwtExpirationMs}")
    private Integer jwtExpirationInMs;

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;

    private final UserService userService;

    private final RoleService roleService;

    private final UserRepository userRepository;

    private final RefreshTokenService refreshTokenService;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtTokenProvider jwtTokenProvider,
                          UserService userService,
                          RoleService roleService,
                          UserRepository userRepository,
                          RefreshTokenService refreshTokenService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
        this.roleService = roleService;
        this.userRepository = userRepository;
        this.refreshTokenService = refreshTokenService;
    }


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
                customUserDetail.getEmail(),
                roles));
    }

    @PostMapping("/auth/sign-up")
    public ResponseEntity<?> registerAuth(@Validated @RequestBody SignupRequest signupRequest) {
        try {
            if (userService.checkExistUsername(signupRequest.getUsername())) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse<>(HttpStatus.BAD_REQUEST, "Error: Username is already taken!", new ArrayList<>()));
            }

            if (userService.checkExistEmail(signupRequest.getEmail())) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse<>(HttpStatus.BAD_REQUEST, "Error: Email is already in use!", new ArrayList<>()));
            }

            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            User user = new User(signupRequest.getUsername(), signupRequest.getEmail(), passwordEncoder.encode(signupRequest.getPassword()));

//            Set<String> strRoles = signupRequest.getRole();
//            Set<Role> roles = new HashSet<>();
//
//            if (strRoles == null) {
//                Role userRole = roleService.findByName(ERole.ROLE_USER).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
//                roles.add(userRole);
//            } else {
//                strRoles.forEach(role -> {
//                    switch (role) {
//                        case "admin" -> {
//                            Role adminRole = roleService.findByName(ERole.ROLE_ADMIN).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
//                            roles.add(adminRole);
//                        }
//                        case "mod" -> {
//                            Role modRole = roleService.findByName(ERole.ROLE_MODERATOR).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
//                            roles.add(modRole);
//                        }
//                        default -> {
//                            Role userRole = roleService.findByName(ERole.ROLE_USER).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
//                            roles.add(userRole);
//                        }
//                    }
//                });

//                strRoles.forEach(role -> {
//                    Role newRole = roleService.findByName(ERole.valueOf(role.toUpperCase())).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
//                    roles.add(newRole);
//                });
//            }
//            user.setRoles(roles);

            user.setRoles(new HashSet<>(getRoles(signupRequest.getRole())));

            userRepository.save(user);

            CustomUserDetailImpl userDetails = CustomUserDetailImpl.build(user);
            UserResponse authResponse = new UserResponse(
                    userDetails.getId(),
                    userDetails.getUsername(),
                    userDetails.getEmail(),
                    userDetails.getAuthorities().stream()
                            .map(GrantedAuthority::getAuthority)
                            .collect(Collectors.toList()));

            List<UserResponse> userList = new ArrayList<>();
            userList.add(authResponse);

            return ResponseEntity.ok(new MessageResponse<>(HttpStatus.OK, "User registered successfully", userList));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new MessageResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, "Error: " + e.getMessage(), new ArrayList<>()));
        }
    }

    @PostMapping("/auth/sign-out")
    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
        CookieUtil.clear(response, "accessToken");
        CookieUtil.clear(response, "refreshToken");

        return ResponseEntity.ok(new MessageResponse<>(HttpStatus.OK, "Log out successful!", new ArrayList<>()));
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
                                .body(new MessageResponse<>(HttpStatus.OK, "Token is refreshed successfully!", new ArrayList<>()));
                    })
                    .orElseThrow(() -> new TokenRefreshException(refreshToken,
                            "Refresh token is not in database!"));
        }
        return ResponseEntity.badRequest().body(new MessageResponse<>(HttpStatus.BAD_REQUEST, "Refresh Token is empty!", new ArrayList<>()));
    }


    @GetMapping("/current-user")
    public ResponseEntity<?> getUser(WebRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            CustomUserDetailImpl customUserDetail = (CustomUserDetailImpl) authentication.getPrincipal();

            List<String> roles = customUserDetail.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());


            return ResponseEntity.ok(new MessageResponse<>(
                    HttpStatus.OK,
                    HttpStatus.OK.name(),
                    new UserResponse(
                            customUserDetail.getId(),
                            customUserDetail.getUsername(),
                            customUserDetail.getEmail(),
                            roles)));

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorMessage(
                            HttpStatus.INTERNAL_SERVER_ERROR,
                            new Date(),
                            e.getMessage(),
                            request.getDescription(true)));
        }
    }

    @GetMapping("/admin")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String admin() {
        return "ADMIN";
    }


    private List<Role> getRoles(Set<String> strRoles) {
        if (strRoles == null || strRoles.isEmpty()) {
            return Collections.singletonList(roleService.findByName(ERole.ROLE_USER).orElseThrow(() -> new RuntimeException("Error: Role is not found")));
        }

        return strRoles.stream()
                .map(role -> roleService.findByName(ERole.valueOf(role.toUpperCase())).orElseThrow(() -> new RuntimeException("Error: Role is not found")))
                .collect(Collectors.toList());
    }

}
