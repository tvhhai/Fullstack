package com.example.server.service.impl;

import com.example.server.entity.Role;
import com.example.server.entity.ERole;
import com.example.server.repository.RoleRepository;
import com.example.server.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleImpl implements RoleService {
    @Autowired //inject bean
    private RoleRepository roleRepository;

    @Override
    public Optional<Role> findByName(ERole name) {
        return Optional.ofNullable(roleRepository.findByName(name));
    }
}
