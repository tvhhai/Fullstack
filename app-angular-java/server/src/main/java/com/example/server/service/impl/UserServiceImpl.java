package com.example.server.service.impl;

import com.example.server.entity.User;
import com.example.server.repository.UserRepository;
import com.example.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService {

    @Autowired //inject bean
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
//        return new UserDetailServiceImpl(user);
        return CustomUserDetailImpl.build(user);
//        return new CustomUserDetailImpl(user);
    }


    @Override
    public Boolean checkExistUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public Boolean checkExistEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
