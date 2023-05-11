package com.example.server.repository;

import com.example.server.entity.RefreshToken;
import com.example.server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer> {
    Optional<RefreshToken> findByToken(String token);

    @Query("SELECT rt FROM RefreshToken rt  WHERE rt.user.id = :user_id")
    Optional<RefreshToken> findUserId(@Param("user_id") Integer user_id);

    @Modifying
    void deleteByUser(User user);
}
