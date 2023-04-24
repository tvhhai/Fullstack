package com.example.server.dataseed;

import com.example.server.entity.Role;
import com.example.server.repository.RoleRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class RoleSeed implements CommandLineRunner {

    @Autowired
    RoleRespository roleRespository;


    @Override
    public void run(String... args) throws Exception {
        loadUserData();
    }

    private void loadUserData() {
        if (roleRespository.count() == 0) {
            Role user1 = new Role("ROLE_USER");
            Role user2 = new Role("ROLE_ADMIN");
            Role user3 = new Role("ROLE_MODERATOR");

            roleRespository.save(user1);
            roleRespository.save(user2);
            roleRespository.save(user3);
        }
    }
}
