package com.capstone.cfos.service;

import com.capstone.cfos.controller.vm.RoleVM;

import java.util.List;

public interface RoleService {

    List<RoleVM> getAllRole(String username);

    RoleVM getRoleById(Long roleId);

    void saveRole(List<RoleVM> vms);
}
