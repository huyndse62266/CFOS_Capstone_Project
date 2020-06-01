package com.capstone.cfos.controller.vm;

import lombok.Data;

@Data
public class PasswordForgotVM {

    private String username;
    private String email;
    private String phone;
}
