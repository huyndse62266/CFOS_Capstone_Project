package com.capstone.cfos.mapper;

import com.capstone.cfos.controller.vm.EmpVM;
import com.capstone.cfos.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface UserMapper {

    @Mappings({
            @Mapping(target = "active", source = "user.employee.active"),
            @Mapping(target = "empId", source = "user.employee.empId"),
            @Mapping(target = "startDate", source = "user.employee.startDate"),
            @Mapping(target = "fcId", source = "user.employee.foodCourt.fcId"),
            @Mapping(target = "storeId", expression = "java(user.getEmployee() != null ? user.getEmployee().getStore() != null ? user.getEmployee().getStore().getStoreId() : null : null)"),
            @Mapping(target = "storeName", expression = "java(user.getEmployee() != null ? user.getEmployee().getStore() != null ? user.getEmployee().getStore().getStoreName() : null : null)"),
            @Mapping(target = "roleId", expression = "java(user.getEmployee() != null ? user.getEmployee().getRole().getRoleId() : null)")
    })
    EmpVM toEmpVM(User user);
}
