package com.capstone.cfos.controller;

import com.capstone.cfos.Utils.Ultilities;
import com.capstone.cfos.controller.vm.ChangePasswordVM;
import com.capstone.cfos.controller.vm.CustomerVM;
import com.capstone.cfos.controller.vm.EmpVM;
import com.capstone.cfos.controller.vm.PasswordForgotVM;
import com.capstone.cfos.model.User;
import com.capstone.cfos.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/api")
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserService userService;

    @GetMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<EmpVM>> getAllUser(
            @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(name = "size", required = false, defaultValue = "5") Integer size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort, HttpServletRequest request) {

        String authorityUsername = Ultilities.getUsername(request);
        Sort sortable = null;
        if (sort.equals("ASC")) {
            sortable = Sort.by(User.PROP_USERNAME).ascending();
        }
        if (sort.equals("DESC")) {
            sortable = Sort.by(User.PROP_USERNAME).descending();
        }
        Pageable pageable = PageRequest.of(page, size, sortable);
        Page<EmpVM> vms = userService.getAllEmp(pageable, authorityUsername);
        LOGGER.info("get all emps: " + vms);
        return new ResponseEntity<Page<EmpVM>>(vms, HttpStatus.OK);
    }

    @GetMapping(value = "/all-customers", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<CustomerVM>> getAllCustomer(
            @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(name = "size", required = false, defaultValue = "5") Integer size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            HttpServletRequest request) {

        String username = Ultilities.getUsername(request);
        Sort sortable = null;
        if (sort.equals("ASC")) {
            sortable = Sort.by(User.PROP_USERNAME).ascending();
        }
        if (sort.equals("DESC")) {
            sortable = Sort.by(User.PROP_USERNAME).descending();
        }
        Pageable pageable = PageRequest.of(page, size, sortable);
        Page<CustomerVM> vms = userService.getAllCustomer(pageable, username);
        LOGGER.info("get all customers: " + vms);
        return new ResponseEntity<Page<CustomerVM>>(vms, HttpStatus.OK);
    }

    @PostMapping("/auth/sign-up")
    public ResponseEntity<EmpVM> signUp(@RequestBody EmpVM vm, HttpServletRequest request) {
        EmpVM result = userService.createEmp(vm, request);
        return new ResponseEntity<EmpVM>(result, HttpStatus.OK);
    }

    @PutMapping("/user/update")
    public ResponseEntity<EmpVM> updateUser(@RequestBody EmpVM vm) {
        EmpVM result = userService.updateEmp(vm);
        LOGGER.info("get update emp: " + result);
        return new ResponseEntity<EmpVM>(result, HttpStatus.OK);
    }

    @PutMapping("/user/update-cus")
    public ResponseEntity<CustomerVM> updateCustomer(@RequestBody CustomerVM vm) {
        CustomerVM result = userService.updateCus(vm);
        LOGGER.info("get update cus: " + result);
        return new ResponseEntity<CustomerVM>(result, HttpStatus.OK);
    }

    @PutMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordForgotVM vm, HttpServletRequest request) {
        String message = userService.resetPassword(vm, request);
        LOGGER.info("reset password: " + message);
        return new ResponseEntity<String>(message, HttpStatus.OK);
    }

    @PutMapping("/edit-password")
    public ResponseEntity<String> editPassword(@RequestBody ChangePasswordVM vm,HttpServletRequest request) {
        String authorityUsername = Ultilities.getUsername(request);

        String message = userService.changePassword(vm, authorityUsername);
        LOGGER.info("edit password: " + message);
        return new ResponseEntity<String>(message, HttpStatus.OK);
    }

    @GetMapping("/search-emp")
    public ResponseEntity<Page<EmpVM>> searchEmp(
            @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(name = "size", required = false, defaultValue = "5") Integer size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        Sort sortable = null;
        if (sort.equals("ASC")) {
            sortable = Sort.by(User.PROP_USERNAME).ascending();
        }
        if (sort.equals("DESC")) {
            sortable = Sort.by(User.PROP_USERNAME).descending();
        }
        Pageable pageable = PageRequest.of(page, size, sortable);
        Page<EmpVM> vmPage = userService.searchEmp(pageable, username, name.trim());
        LOGGER.info("search emp: " + vmPage.getSize());
        return new ResponseEntity<Page<EmpVM>>(vmPage, HttpStatus.OK);
    }

    @GetMapping("/search-customer")
    public ResponseEntity<Page<CustomerVM>> searchCus(
            @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(name = "size", required = false, defaultValue = "5") Integer size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        Sort sortable = null;
        if (sort.equals("ASC")) {
            sortable = Sort.by(User.PROP_USERNAME).ascending();
        }
        if (sort.equals("DESC")) {
            sortable = Sort.by(User.PROP_USERNAME).descending();
        }
        Pageable pageable = PageRequest.of(page, size, sortable);
        Page<CustomerVM> vmPage = userService.searchCus(pageable, username, name);
        LOGGER.info("search emp: " + vmPage.getSize());
        return new ResponseEntity<Page<CustomerVM>>(vmPage, HttpStatus.OK);
    }

    @GetMapping("/emp")
    public ResponseEntity<EmpVM> getEmp(@RequestParam(value = "id") Long id) {
        EmpVM vm = userService.getEmpById(id);
        LOGGER.info("get emp: " + id);
        return new ResponseEntity<EmpVM>(vm, HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<EmpVM> getProfile(HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        EmpVM vm = userService.getProfile(username);
        LOGGER.info("get profile: " + username);
        return new ResponseEntity<EmpVM>(vm, HttpStatus.OK);
    }

    @DeleteMapping("/delete-emp")
//    @PreAuthorize("hasRole('READ_PRIVILEGE')")
    public ResponseEntity<String> deleteEmp(@RequestParam Long id) {
        String message = userService.deleteEmp(id);
        LOGGER.info("delete emp: " + id);
        return new ResponseEntity<String>(message, HttpStatus.OK);
    }


}
