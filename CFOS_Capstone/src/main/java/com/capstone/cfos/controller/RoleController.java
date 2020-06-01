package com.capstone.cfos.controller;

import com.capstone.cfos.Utils.Ultilities;
import com.capstone.cfos.controller.vm.RoleVM;
import com.capstone.cfos.service.RoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/api")
public class RoleController {

    private static final Logger LOGGER = LoggerFactory.getLogger(RoleController.class);

    @Autowired
    private RoleService roleService;

    @GetMapping("/all-role")
    public ResponseEntity<List<RoleVM>> getAllRole(HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        List<RoleVM> vm = roleService.getAllRole(username);
        LOGGER.info("get all role: " + vm.size());
        return new ResponseEntity<List<RoleVM>>(vm, HttpStatus.OK);
    }

    @GetMapping("/role")
    public ResponseEntity<RoleVM> getRoleById(@RequestParam Long roleId) {
        RoleVM vm = roleService.getRoleById(roleId);
        LOGGER.info("get role by id: " + roleId);
        return new ResponseEntity<RoleVM>(vm, HttpStatus.OK);
    }


}
