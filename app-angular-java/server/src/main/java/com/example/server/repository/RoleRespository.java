package com.example.server.repository;

import com.example.server.entity.Role;
import com.example.server.entity.ERole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRespository extends JpaRepository<Role, Integer> {
    Role findByName(ERole name);
}
