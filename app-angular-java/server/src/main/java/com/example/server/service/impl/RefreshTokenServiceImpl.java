package com.example.server.service.impl;

import com.example.server.entity.RefreshToken;
import com.example.server.exception.TokenRefreshException;
import com.example.server.repository.RefreshTokenRepository;
import com.example.server.repository.UserRepository;
import com.example.server.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {
    @Value("${jwt.jwtRefreshExpirationMs}")
    private Long refreshTokenDurationMs;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken createRefreshToken(Integer userId) {
        Optional<RefreshToken> optionalRefreshToken = refreshTokenRepository.findUserId(userId);
        return optionalRefreshToken
                .map(_refreshToken -> {
                    _refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
                    _refreshToken.setToken(UUID.randomUUID().toString());
                    return refreshTokenRepository.save(_refreshToken);
                })
                .orElseGet(() -> {
                    RefreshToken newRefreshToken = new RefreshToken();
                    newRefreshToken.setUser(userRepository.findById(userId).orElse(null));
                    newRefreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
                    newRefreshToken.setToken(UUID.randomUUID().toString());
                    return refreshTokenRepository.save(newRefreshToken);
                });
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(), "Refresh token was expired. Please make a new signin request");
        }

        return token;
    }

    @Transactional
    public void deleteByUserId(Integer userId) {
        refreshTokenRepository.deleteByUser(userRepository.findById(userId).orElse(null));
    }
}
