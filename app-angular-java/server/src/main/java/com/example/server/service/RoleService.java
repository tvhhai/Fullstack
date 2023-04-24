package com.example.server.service;

import com.example.server.entity.Role;
import com.example.server.entity.ERole;

import java.util.Optional;

public interface RoleService {
    Optional<Role> findByName(ERole name);

}
