package com.example.server.dataseed;

import com.example.server.entity.ERole;
import com.example.server.entity.Role;
import com.example.server.entity.User;
import com.example.server.repository.RoleRepository;
import com.example.server.repository.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;

@Component
public class UserRoleSeed implements ApplicationRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserRoleSeed(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) throws Exception {
        long userCount = userRepository.count();
        long roleCount = roleRepository.count();
        if (userCount > 0 && roleCount > 0) {
            return;
        }

        // create roles
        Role roleUser = new Role(ERole.ROLE_USER);
        Role roleAdmin = new Role(ERole.ROLE_ADMIN);
        Role roleMod = new Role(ERole.ROLE_MODERATOR);
        roleRepository.saveAll(Arrays.asList(roleUser, roleAdmin, roleMod));

        // create admin user
        User admin = new User();
        admin.setUsername("admin");
        admin.setEmail("admin@example.com");
        admin.setPassword(new BCryptPasswordEncoder().encode("222222"));
        admin.setRoles(new HashSet<>(Arrays.asList(roleAdmin, roleMod)));
        userRepository.save(admin);

        // create normal user
        User user = new User();
        user.setUsername("user");
        user.setEmail("user@example.com");
        user.setPassword(new BCryptPasswordEncoder().encode("222222"));
        user.setRoles(Collections.singleton(roleUser));
        userRepository.save(user);
    }

}
