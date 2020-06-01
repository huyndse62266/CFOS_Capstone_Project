package com.capstone.cfos;

import com.capstone.cfos.controller.vm.EmpVM;
import com.capstone.cfos.controller.vm.RoleVM;
import com.capstone.cfos.service.BlockService;
import com.capstone.cfos.service.RoleService;
import com.capstone.cfos.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import com.fasterxml.jackson.core.type.TypeReference;
import com.capstone.cfos.security.SecurityKeyPairGenerator;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@org.springframework.stereotype.Component
public class Component implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private BlockService blockService;

    @Override
    public void run(String... args) throws Exception {
        saveRole();
        saveAdminAccount();
        saveBlock();
      //  creatRsaCode();
    }

    private void saveRole() {
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<List<RoleVM>> typeReference = new TypeReference<List<RoleVM>>() {
        };
        InputStream inputStream = TypeReference.class.getResourceAsStream("/role.json");
        try {
            List<RoleVM> roleVMS = mapper.readValue(inputStream, typeReference);
            roleService.saveRole(roleVMS);
        } catch (IOException e) {
            System.out.println("Unable to save roles: " + e.getMessage());
        }

    }

    private void saveAdminAccount() {
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<EmpVM> typeReference = new TypeReference<EmpVM>() {
        };
        InputStream inputStream = TypeReference.class.getResourceAsStream("/admin-account.json");
        try {
            EmpVM empVM = mapper.readValue(inputStream, typeReference);
            userService.saveAdminAccount(empVM);
        } catch (IOException e) {
            System.out.println("Unable to save admin: " + e.getMessage());
        }

    }

    private void saveBlock(){
        blockService.saveBlock();
    }

    private void creatRsaCode(){
        SecurityKeyPairGenerator securityKeyPairGenerator = new SecurityKeyPairGenerator();
        securityKeyPairGenerator.createRSA();
    }
}