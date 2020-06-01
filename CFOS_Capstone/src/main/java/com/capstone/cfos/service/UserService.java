package com.capstone.cfos.service;

import com.capstone.cfos.controller.vm.ChangePasswordVM;
import com.capstone.cfos.controller.vm.CustomerVM;
import com.capstone.cfos.controller.vm.EmpVM;
import com.capstone.cfos.controller.vm.PasswordForgotVM;
import com.capstone.cfos.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface UserService {
    EmpVM createEmp(EmpVM vm, HttpServletRequest request);

    EmpVM updateEmp(EmpVM vm);

    CustomerVM updateCus(CustomerVM vm);

    String resetPassword(PasswordForgotVM vm, HttpServletRequest request);

    String changePassword(ChangePasswordVM vm, String authorityUsername);

    List<EmpVM> getAllEmp();

    Page<EmpVM> getAllEmp(Pageable pageable, String authorityUsername);

    Page<CustomerVM> getAllCustomer(Pageable pageable, String authorityUsername);

    Page<EmpVM> searchEmp(Pageable pageable, String authorityUsername, String name);

    Page<CustomerVM> searchCus(Pageable pageable, String authorityUsername, String name);

    EmpVM getEmpById(Long id);

    EmpVM getProfile(String authorityUsername);

    String deleteEmp(Long id);

    void saveAdminAccount(EmpVM vm);

    CustomerVM getInfoCustomer(String usernameCus,String carrId);

    String updateCustomerInfo(CustomerVM customerVM,String username);

    String updateDeviceToken(String authorityUsername, String deviceToken);

    String deactivateCard(String username, String password);
}
