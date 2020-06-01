package com.capstone.cfos.mapper;

import com.capstone.cfos.controller.vm.RoleVM;
import com.capstone.cfos.model.Role;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface RoleMapper {

    RoleVM toRoleVM(Role role);
}
