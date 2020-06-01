package com.capstone.cfos.service;

import com.capstone.cfos.constants.Constant;
import com.capstone.cfos.model.User;
import com.capstone.cfos.repository.UserRepository;

import static java.util.Collections.emptyList;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserLogin(username, Constant.BLOCKED);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        String roleName = "";
        if (user.getEmployee() != null) {
            if (!user.getEmployee().isActive()) {
                if (user.getCustomer().isActive()) {
                    roleName = Constant.CUSTOMER;
                } else {
                    throw new UsernameNotFoundException(username);
                }
            } else {
                roleName = user.getEmployee().getRole().getRoleName();
            }
        } else {
            if (!user.getCustomer().isActive()) {
                throw new UsernameNotFoundException(username);
            }
            roleName = Constant.CUSTOMER;
        }
        Collection<GrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority(roleName));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }
}

