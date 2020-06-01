package com.capstone.cfos.service;

import static com.capstone.cfos.constants.Constant.*;

import com.capstone.cfos.controller.vm.RoleVM;
import com.capstone.cfos.mapper.RoleMapper;
import com.capstone.cfos.model.Role;
import com.capstone.cfos.model.User;
import com.capstone.cfos.repository.RoleRepository;
import com.capstone.cfos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleServiceImp implements RoleService {

    @Autowired
    private RoleRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleMapper roleMapper;

    @Override
    public List<RoleVM> getAllRole(String username) {
        User user = userRepository.findByUsername(username);

        if (user.getEmployee() == null) throw new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR, "Unauthoried!");

        String roleName = user.getEmployee().getRole().getRoleName();
        List<Role> roles = new ArrayList<>();
        switch (roleName) {
            case SYSTEM_ADMIN:
                roles.add(repository.findByRoleName(FOOD_COURT_MANAGER));
                break;
            case FOOD_COURT_MANAGER:
                List<String> roleNames = new ArrayList<>();
                roleNames.add(SYSTEM_ADMIN);
                roleNames.add(FOOD_COURT_MANAGER);
                roles = repository.findByRoleNames(roleNames);
                break;
            case CASHIER:
                Role role = new Role();
                role.setRoleId(0L);
                role.setRoleName(CUSTOMER);
                roles.add(role);
                break;
            default:
                roles = null;
        }
        if (roles == null || roles.isEmpty())
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "List role empty!");
        return roles.stream().map(roleMapper::toRoleVM).collect(Collectors.toList());
    }

    @Override
    public RoleVM getRoleById(Long roleId) {
        Role role = repository.findByRoleId(roleId);
        if (role == null)
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Role is not exist!");
        return roleMapper.toRoleVM(role);
    }

    @Override
    public void saveRole(List<RoleVM> vms) {
        List<Role> roles = repository.findAll();
        if (roles == null || roles.isEmpty()) {
            roles = vms.stream().map(r -> {
                Role role = new Role();
                role.setRoleName(r.getRoleName());
                return role;
            }).collect(Collectors.toList());
            repository.saveAll(roles);
        }
    }
}
